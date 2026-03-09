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

export type Team = {
  id: string;
  leagueId: string;
  division: string;
  name: string;
  logo: string;

  record: { w: number; l: number; ot?: number };
  points: number;
  gf: number;
  ga: number;

  roster?: {
    id: string;
    name: string;
    number?: string;
    position?: string;
  }[];
};

export type Score = {
  home: number;
  away: number;
};

export type Game = {
  id: string
  division: string
  leagueId: string
  dateISO: string
  location?: string

  homeTeamName: string
  awayTeamName: string

  homeTeamLogo: string
  awayTeamLogo: string

  score?: {
    home: number
    away: number
  }
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

// =======================================
// MOCK DATABASE
// =======================================

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
    leagueId: "league-dev",
    division: "rookie",
    name: "Ducks",
    logo: "https://firebasestorage.googleapis.com/v0/b/raptor-f203a.appspot.com/o/teamLogo%2FEE253CF1-5FF9-4CD8-954D-136D38A69D0E_teamLogo.png?alt=media&token=cb5f926a-7f22-4df3-9201-ed64e058b870",

    record: { w: 8, l: 3, ot: 1 },
    points: 17,
    gf: 44,
    ga: 29,
  },
  {
    id: "gladiators",
    leagueId: "league-dev",
    division: "elite",
    name: "Gladiators",
    logo: "https://firebasestorage.googleapis.com/v0/b/raptor-f203a.appspot.com/o/teamLogo%2FEE253CF1-5FF9-4CD8-954D-136D38A69D0E_teamLogo.png?alt=media&token=cb5f926a-7f22-4df3-9201-ed64e058b870",

    record: { w: 7, l: 4, ot: 1 },
    points: 15,
    gf: 39,
    ga: 33,
  },
],

  games: [
  {
    id: "g1",
    division: "rookie",
    leagueId: "league-dev",
    dateISO: "2026-03-13T02:30:00Z",
    location: "SLC Ice Center - Rink 2",
    homeTeamName: "ducks",
    awayTeamName: "penguins",

    homeTeamLogo:
      "https://firebasestorage.googleapis.com/v0/b/raptor-f203a.appspot.com/o/teamLogo%2FEE253CF1-5FF9-4CD8-954D-136D38A69D0E_teamLogo.png?alt=media&token=cb5f926a-7f22-4df3-9201-ed64e058b870",
    awayTeamLogo:
      "https://firebasestorage.googleapis.com/v0/b/raptor-f203a.appspot.com/o/teamLogo%2FEE253CF1-5FF9-4CD8-954D-136D38A69D0E_teamLogo.png?alt=media&token=cb5f926a-7f22-4df3-9201-ed64e058b870",
  },

  {
    id: "g2",
    division: "elite",
    leagueId: "league-dev",
    dateISO: "2026-02-10T02:30:00Z",
    location: "SLC Ice Center - Rink 1",
    homeTeamName: "gladiators",
    awayTeamName: "ducks",

    homeTeamLogo:
      "https://firebasestorage.googleapis.com/v0/b/raptor-f203a.appspot.com/o/teamLogo%2FEE253CF1-5FF9-4CD8-954D-136D38A69D0E_teamLogo.png?alt=media&token=cb5f926a-7f22-4df3-9201-ed64e058b870",
    awayTeamLogo:
      "https://firebasestorage.googleapis.com/v0/b/raptor-f203a.appspot.com/o/teamLogo%2FEE253CF1-5FF9-4CD8-954D-136D38A69D0E_teamLogo.png?alt=media&token=cb5f926a-7f22-4df3-9201-ed64e058b870",

    score: { home: 2, away: 4 },
  },

  {
    id: "g3",
    division: "pro",
    leagueId: "league-dev",
    dateISO: "2026-03-09T05:30:00Z",
    location: "SLC Ice Center - Rink 1",
    homeTeamName: "mammoth",
    awayTeamName: "ducks",

    homeTeamLogo:
      "https://firebasestorage.googleapis.com/v0/b/raptor-f203a.appspot.com/o/teamLogo%2FEE253CF1-5FF9-4CD8-954D-136D38A69D0E_teamLogo.png?alt=media&token=cb5f926a-7f22-4df3-9201-ed64e058b870",
    awayTeamLogo:
      "https://firebasestorage.googleapis.com/v0/b/raptor-f203a.appspot.com/o/teamLogo%2FEE253CF1-5FF9-4CD8-954D-136D38A69D0E_teamLogo.png?alt=media&token=cb5f926a-7f22-4df3-9201-ed64e058b870",

    score: { home: 2, away: 4 },
  },

  {
    id: "g4",
    division: "a",
    leagueId: "league-dev",
    dateISO: "2026-02-28T02:30:00Z",
    location: "SLC Ice Center - Rink 2",
    homeTeamName: "ducks",
    awayTeamName: "sharks",

    homeTeamLogo:
      "https://firebasestorage.googleapis.com/v0/b/raptor-f203a.appspot.com/o/teamLogo%2FEE253CF1-5FF9-4CD8-954D-136D38A69D0E_teamLogo.png?alt=media&token=cb5f926a-7f22-4df3-9201-ed64e058b870",
    awayTeamLogo:
      "https://firebasestorage.googleapis.com/v0/b/raptor-f203a.appspot.com/o/teamLogo%2FEE253CF1-5FF9-4CD8-954D-136D38A69D0E_teamLogo.png?alt=media&token=cb5f926a-7f22-4df3-9201-ed64e058b870",

    score: { home: 3, away: 1 },
  },

  {
    id: "g5",
    division: "b",
    leagueId: "league-dev",
    dateISO: "2026-03-09T02:30:00Z",
    location: "SLC Ice Center - Rink 2",
    homeTeamName: "ducks",
    awayTeamName: "panthers",

    homeTeamLogo:
      "https://firebasestorage.googleapis.com/v0/b/raptor-f203a.appspot.com/o/teamLogo%2FEE253CF1-5FF9-4CD8-954D-136D38A69D0E_teamLogo.png?alt=media&token=cb5f926a-7f22-4df3-9201-ed64e058b870",
    awayTeamLogo:
      "https://firebasestorage.googleapis.com/v0/b/raptor-f203a.appspot.com/o/teamLogo%2FEE253CF1-5FF9-4CD8-954D-136D38A69D0E_teamLogo.png?alt=media&token=cb5f926a-7f22-4df3-9201-ed64e058b870",

    score: { home: 5, away: 3 },
  },

  {
    id: "g6",
    division: "b",
    leagueId: "league-dev",
    dateISO: "2026-03-15T02:30:00Z",
    location: "SLC Ice Center - Rink 2",
    homeTeamName: "ducks",
    awayTeamName: "dragons",

    homeTeamLogo:
      "https://firebasestorage.googleapis.com/v0/b/raptor-f203a.appspot.com/o/teamLogo%2FEE253CF1-5FF9-4CD8-954D-136D38A69D0E_teamLogo.png?alt=media&token=cb5f926a-7f22-4df3-9201-ed64e058b870",
    awayTeamLogo:
      "https://firebasestorage.googleapis.com/v0/b/raptor-f203a.appspot.com/o/teamLogo%2FEE253CF1-5FF9-4CD8-954D-136D38A69D0E_teamLogo.png?alt=media&token=cb5f926a-7f22-4df3-9201-ed64e058b870",
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

// GAMES
export async function getGames(_: string): Promise<Game[]> {
  return simulateLatency(mockDB.games);
}

// STANDINGS
export async function getStandings(_: string): Promise<Team[]> {
  return simulateLatency(
    [...mockDB.teams].sort((a, b) => b.points - a.points)
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
