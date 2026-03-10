// =======================================
// TYPES
// =======================================

export type League = {
  id: string;
  name: string;
  domain: string;
  seasonLabel: string;
  location?: string;
  brand: {
    logoText: string;
    primary: string;
    accent: string;
  };
};

export type Score = {
  home?: number
  away?: number
}

export type Team = {
  id?: string
  name?: string
  logo?: string
  leagueID?: string
  division?: string
  sportType?: string
  sportLeagueID?: string
  teamStats?: string
  players?: string[]
}

export type Profile = {
  id: string
  userID?: string
  name: string
  email?: string
  imageURL: string

  // Player
  playerNumber?: string
  position?: string
  statsID?: string
  teamName?: string
  isSuspended?: boolean

  // Coach & Player
  leagueID?: string
  sportType?: string
  division?: string
  teamID?: string

}

export type Game = {
  arenaID?: string
  arenaName?: string
  awayTeam: Team
  awayTeamPlayers?: Profile[]
  division?: string
  gameType?: string
  homeTeam: Team
  homeTeamPlayers?: Profile[]
  id: string
  leagueID?: string
  matchStart: string
  isFinished?: boolean
  score?: Score
  sportID?: string
  sportType?: string
  seasonID?: string
  teamsID?: string[]
}

export type NewsPost = {
  id: string;
  leagueId: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedISO: string;
};

export type Sponsor = {
  id: string;
  leagueId: string;
  name: string;
  url?: string;
};

export type PlayerStats = {
  id: string
  teamID?: string
  leagueID?: string
  division?: string
  seasonID?: string
  name: string
  playerNumber?: string
  playerID?: string

  hockey?: Hockey
  football?: Football
  basketBall?: Basketball
  soccer?: Soccer
  volleyBall?: Volleyball
  baseball?: Baseball
  lacrosse?: Lacrosse
}

export type Hockey = {
  pos?: string
  gp?: string
  g?: string
  a?: string
  pts?: string
  ppga?: string
  pim?: string
}

export type Football = {
  pos?: string
  gp?: string
  pts?: string
  ptsAvg?: string
  yds?: string
  ydsAvg?: string
  td?: string
  tdAvg?: string
}

export type Basketball = {
  pos?: string
  gp?: string
  min?: string
  pts?: string
  fg?: string
  pf?: string
}

export type Soccer = {
  pos?: string
  gp?: string
  g?: string
  a?: string
  pts?: string
  ppga?: string
}

export type Volleyball = {
  pos?: string
  gp?: string
  pts?: string
  ppga?: string
  serves?: string
  blocks?: string
}

export type Baseball = {
  pos?: string
  gp?: string
  h?: string
  hr?: string
  ab?: string
  so?: string
  batgAvg?: string
  single?: string
  double?: string
  triple?: string
}

export type Lacrosse = {
  pos?: string
  gp?: string
  g?: string
  a?: string
  pts?: string
  ppga?: string
}

// =======================================
// MOCK DATABASE
// =======================================

const teamLogo =
  "https://firebasestorage.googleapis.com/v0/b/raptor-f203a.appspot.com/o/teamLogo%2FEE253CF1-5FF9-4CD8-954D-136D38A69D0E_teamLogo.png?alt=media&token=cb5f926a-7f22-4df3-9201-ed64e058b870";

const teamPlayerImage = "https://firebasestorage.googleapis.com/v0/b/raptor-f203a.appspot.com/o/profileImage%2F40DV5j6OI8gfE0hXzzF2xpE6Ksi2_RgueD_profileImage.png?alt=media&token=7aef98e0-bae9-432c-9173-056da1ee81e6";

const mockDB = {
  leagues: [
    {
      id: "league-dev",
      name: "Raptor Dev Hockey League",
      domain: "localhost:3000",
      seasonLabel: "Winter 2026",
      location: "Utah",
      brand: {
        logoText: "RAPTOR DEV",
        primary: "bg-black",
        accent: "text-black",
      },
    },
  ] as League[],

  teams: [
    {
      id: "ducks",
      name: "Ducks",
      logo: teamLogo,
      leagueID: "league-dev",
      division: "rookie",
      sportType: "hockey",
      sportLeagueID: "hl-1",
      teamStats: "8-3-1",
      players: ["p1", "p2", "p3"],
    },
    {
      id: "gladiators",
      name: "Gladiators",
      logo: teamLogo,
      leagueID: "league-dev",
      division: "elite",
      sportType: "hockey",
      sportLeagueID: "hl-1",
      teamStats: "7-4-1",
      players: ["p4", "p5"],
    },
    {
      id: "penguins",
      name: "Penguins",
      logo: teamLogo,
      leagueID: "league-dev",
      division: "rookie",
      sportType: "hockey",
      sportLeagueID: "hl-1",
      teamStats: "6-5-0",
      players: ["p6", "p7"],
    },
  ] as Team[],

  profiles: [
    {
      id: "p1",
      userID: "u1",
      name: "John Carter",
      email: "john@example.com",
      imageURL: teamPlayerImage,
      playerNumber: "9",
      position: "C",
      statsID: "stats1",
      teamName: "Ducks",
      isSuspended: false,
      leagueID: "league-dev",
      sportType: "hockey",
      division: "rookie",
      teamID: "ducks",
    },
    {
      id: "p2",
      userID: "u2",
      name: "Mike Adams",
      email: "mike@example.com",
      imageURL: teamPlayerImage,
      playerNumber: "21",
      position: "LW",
      statsID: "stats2",
      teamName: "Ducks",
      isSuspended: false,
      leagueID: "league-dev",
      sportType: "hockey",
      division: "rookie",
      teamID: "ducks",
    },
    {
      id: "p3",
      userID: "u3",
      name: "Chris Walker",
      email: "chris@example.com",
      imageURL: teamPlayerImage,
      playerNumber: "31",
      position: "G",
      statsID: "stats3",
      teamName: "Ducks",
      isSuspended: false,
      leagueID: "league-dev",
      sportType: "hockey",
      division: "rookie",
      teamID: "ducks",
    },
    {
      id: "p4",
      userID: "u4",
      name: "Ryan Brooks",
      email: "ryan@example.com",
      imageURL: teamPlayerImage,
      playerNumber: "14",
      position: "RW",
      statsID: "stats4",
      teamName: "Gladiators",
      isSuspended: false,
      leagueID: "league-dev",
      sportType: "hockey",
      division: "elite",
      teamID: "gladiators",
    },
  ] as Profile[],

  playerStats: [
  {
    id: "stats1",
    playerID: "p1",
    teamID: "ducks",
    leagueID: "league-dev",
    division: "rookie",
    seasonID: "season-2026",
    name: "John Carter",
    playerNumber: "9",

    hockey: {
      pos: "C",
      gp: "12",
      g: "7",
      a: "10",
      pts: "17",
      ppga: "1.41",
      pim: "4",
    },
  },

  {
    id: "stats2",
    playerID: "p2",
    teamID: "ducks",
    leagueID: "league-dev",
    division: "rookie",
    seasonID: "season-2026",
    name: "Mike Adams",
    playerNumber: "21",

    hockey: {
      pos: "LW",
      gp: "12",
      g: "5",
      a: "8",
      pts: "13",
      ppga: "1.08",
      pim: "6",
    },
  },

  {
    id: "stats3",
    playerID: "p3",
    teamID: "ducks",
    leagueID: "league-dev",
    division: "rookie",
    seasonID: "season-2026",
    name: "Chris Walker",
    playerNumber: "31",

    hockey: {
      pos: "G",
      gp: "10",
      g: "0",
      a: "1",
      pts: "1",
      ppga: "0.10",
      pim: "0",
    },
  },

  {
    id: "stats4",
    playerID: "p4",
    teamID: "gladiators",
    leagueID: "league-dev",
    division: "elite",
    seasonID: "season-2026",
    name: "Ryan Brooks",
    playerNumber: "14",

    hockey: {
      pos: "RW",
      gp: "11",
      g: "9",
      a: "6",
      pts: "15",
      ppga: "1.36",
      pim: "2",
    },
  },
] as PlayerStats[],

  games: [
    {
      id: "g1",
      arenaID: "arena1",
      arenaName: "SLC Ice Center - Rink 2",
      division: "rookie",
      gameType: "season",
      leagueID: "league-dev",
      matchStart: "2026-03-13T02:30:00Z",
      sportID: "sport-hockey",
      sportType: "hockey",
      seasonID: "winter-2026",
      teamsID: ["ducks", "penguins"],

      homeTeam: {
        id: "ducks",
        name: "Ducks",
        logo: teamLogo,
        leagueID: "league-dev",
        division: "rookie",
      },

      awayTeam: {
        id: "penguins",
        name: "Penguins",
        logo: teamLogo,
        leagueID: "league-dev",
        division: "rookie",
      },

      homeTeamPlayers: [],
      awayTeamPlayers: [],
    },

    {
      id: "g2",
      arenaID: "arena2",
      arenaName: "SLC Ice Center - Rink 1",
      division: "elite",
      gameType: "season",
      leagueID: "league-dev",
      matchStart: "2026-02-10T02:30:00Z",
      sportID: "sport-hockey",
      sportType: "hockey",
      seasonID: "winter-2026",
      teamsID: ["gladiators", "ducks"],

      homeTeam: {
        id: "gladiators",
        name: "Gladiators",
        logo: teamLogo,
        leagueID: "league-dev",
        division: "elite",
      },

      awayTeam: {
        id: "ducks",
        name: "Ducks",
        logo: teamLogo,
        leagueID: "league-dev",
        division: "elite",
      },

      score: { home: 2, away: 4 },
      isFinished: true,

      homeTeamPlayers: [],
      awayTeamPlayers: [],
    },

    {
      id: "g3",
      arenaID: "arena1",
      arenaName: "SLC Ice Center - Rink 1",
      division: "pro",
      gameType: "season",
      leagueID: "league-dev",
      matchStart: "2026-03-09T05:30:00Z",
      sportID: "sport-hockey",
      sportType: "hockey",
      seasonID: "winter-2026",
      teamsID: ["penguins", "ducks"],

      homeTeam: {
        id: "penguins",
        name: "Penguins",
        logo: teamLogo,
        leagueID: "league-dev",
        division: "pro",
      },

      awayTeam: {
        id: "ducks",
        name: "Ducks",
        logo: teamLogo,
        leagueID: "league-dev",
        division: "pro",
      },

      score: { home: 2, away: 4 },
      isFinished: true,

      homeTeamPlayers: [],
      awayTeamPlayers: [],
    },
  ] as Game[],

  news: [
    {
      id: "n1",
      leagueId: "league-dev",
      slug: "season-kickoff",
      title: "Season Kickoff Announced",
      excerpt: "Opening night starts February 15th.",
      content:
        "Opening night begins February 15th.\n\nCheck your roster and schedule.",
      publishedISO: "2026-02-01T18:00:00Z",
    },
  ] as NewsPost[],

  sponsors: [
    { id: "s1", leagueId: "league-dev", name: "Acme Sports" },
    { id: "s2", leagueId: "league-dev", name: "IceTime Gear" },
  ] as Sponsor[],
};

// =======================================
// INTERNAL HELPERS
// =======================================

function simulateLatency<T>(data: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 100);
  });
}

function getDefaultLeague(): League {
  return mockDB.leagues[0];
}

function getDefaultTeam(): Team {
  return mockDB.teams[0];
}

function getDefaultNews(): NewsPost {
  return mockDB.news[0];
}

// =======================================
// SERVICE FUNCTIONS (SAFE MODE)
// =======================================

// LEAGUE
export async function getLeagueByDomain(_: string): Promise<League> {
  return simulateLatency(getDefaultLeague());
}

export async function getLeagueById(id: string): Promise<League> {
  return simulateLatency(
    mockDB.leagues.find((l) => l.id === id) ?? getDefaultLeague()
  );
}

// TEAMS
export async function getTeams(_: string): Promise<Team[]> {
  return simulateLatency(mockDB.teams);
}

export async function getTeam(
  _: string,
  teamId: string
): Promise<Team> {
  return simulateLatency(
    mockDB.teams.find((t) => t.id === teamId) ?? getDefaultTeam()
  );
}

export async function getPlayersByIDs(ids: string[]) {
  const players = mockDB.profiles.filter((p) => ids.includes(p.id))
  return players
}

// GAMES
export async function getGames(_: string): Promise<Game[]> {
  return simulateLatency(mockDB.games);
}

export async function getPlayerStatsByIDs(
  statsIDs: string[]
): Promise<PlayerStats[]> {

  return simulateLatency(
    mockDB.playerStats.filter((stat) =>
      statsIDs.includes(stat.id)
    )
  )
}

// STANDINGS
export async function getStandings(_: string): Promise<Team[]> {
  return simulateLatency(
    [...mockDB.teams].sort((a, b) => b.teamStats - a.teamStats)
  );
}

// NEWS
export async function getNews(_: string): Promise<NewsPost[]> {
  return simulateLatency(mockDB.news);
}

export async function getNewsPost(
  _: string,
  slug: string
): Promise<NewsPost> {
  return simulateLatency(
    mockDB.news.find((n) => n.slug === slug) ?? getDefaultNews()
  );
}

// SPONSORS
export async function getSponsors(_: string): Promise<Sponsor[]> {
  return simulateLatency(mockDB.sponsors);
}
