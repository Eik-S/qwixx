output "cloudfront_arn" {
  value = aws_cloudfront_distribution.prod_distribution.arn
}
