export interface MatchupPlayer {
  id: string
  name: string
  avatarCode: number
  wins: number
}

export interface Matchup {
  players: MatchupPlayer[]
}
