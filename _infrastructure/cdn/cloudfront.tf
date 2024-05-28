resource "aws_cloudfront_origin_access_control" "prod_distribution" {
  name                              = "s3-cloudfront-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}


resource "aws_cloudfront_distribution" "prod_distribution" {
  default_root_object = "index.html"
  enabled             = true
  is_ipv6_enabled     = true
  aliases = [
    var.website_domain_name
  ]

  # needed for react router to work
  custom_error_response {
    error_caching_min_ttl = 0
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
  }

  # Distributes content to US and Europe
  price_class = "PriceClass_100"
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  # SSL certificate for the service.
  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.cert.arn
    ssl_support_method  = "sni-only"
  }

  origin {
    domain_name              = "${var.website_domain_name}.s3.eu-central-1.amazonaws.com"
    origin_id                = "qwixx-pwa"
    origin_access_control_id = aws_cloudfront_origin_access_control.prod_distribution.id
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "qwixx-pwa"
    compress               = true
    cache_policy_id        = aws_cloudfront_cache_policy.default.id
    viewer_protocol_policy = "redirect-to-https"

  }
}

resource "aws_cloudfront_cache_policy" "default" {
  name        = "qwixx-default-cache-policy"
  min_ttl     = 0
  default_ttl = 3600
  max_ttl     = 31536000
  parameters_in_cache_key_and_forwarded_to_origin {
    cookies_config {
      cookie_behavior = "none"
    }
    query_strings_config {
      query_string_behavior = "none"
    }
    headers_config {
      header_behavior = "whitelist"
      headers {
        items = ["Origin"]
      }
    }

    enable_accept_encoding_brotli = true
    enable_accept_encoding_gzip   = true
  }
}
