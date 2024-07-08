import z from "zod";

const leagueShortcut = "em";
const leagueId = 4708;
const leagueSeason = 2024;
const baseUrl = "https://api.openligadb.de";

const groupSchema = z.object({
  groupName: z.string(),
  groupOrderID: z.number(),
  groupID: z.number(),
});

const teamSchema = z.object({
  teamId: z.number(),
  teamName: z.string(),
  shortName: z.string(),
  teamIconUrl: z.string(),
  teamGroupName: z.string().nullable(),
});

const matchResultSchema = z.object({
  resultID: z.number(),
  resultName: z.string(),
  pointsTeam1: z.number(),
  pointsTeam2: z.number(),
  resultOrderID: z.number(),
  resultTypeID: z.number(),
  resultDescription: z.string(),
});

const goalSchema = z.object({
  goalID: z.number(),
  scoreTeam1: z.number(),
  scoreTeam2: z.number(),
  matchMinute: z.number().nullable(),
  goalGetterID: z.number(),
  goalGetterName: z.string(),
  isPenalty: z.boolean(),
  isOwnGoal: z.boolean(),
  isOvertime: z.boolean(),
  comment: z.string().nullable(),
});

const locationSchema = z.object({
  locationID: z.number(),
  locationCity: z.string(),
  locationStadium: z.string().nullable(),
});

const matchSchema = z.object({
  matchID: z.number(),
  matchDateTime: z.string(),
  timeZoneID: z.string(),
  leagueId: z.number(),
  leagueName: z.string(),
  leagueSeason: z.number(),
  leagueShortcut: z.string(),
  matchDateTimeUTC: z.string(),
  group: groupSchema,
  team1: teamSchema,
  team2: teamSchema,
  lastUpdateDateTime: z.string(),
  matchIsFinished: z.boolean(),
  matchResults: z.array(matchResultSchema),
  goals: z.array(goalSchema),
  location: locationSchema.nullable(),
  numberOfViewers: z.number().nullable(),
});

const getCurrentGroup = async () => {
  const response = await fetch(`${baseUrl}/getcurrentgroup/${leagueShortcut}`);
  const json = await response.json();
  return groupSchema.parse(json);
};

const getAvailableGroups = async () => {
  const response = await fetch(
    `${baseUrl}/getavailablegroups/${leagueShortcut}/${leagueSeason}`,
  );
  const json = await response.json();
  return z.array(groupSchema).parse(json);
};

const getAvailableTeams = async () => {
  const response = await fetch(
    `${baseUrl}/getavailableteams/${leagueShortcut}/${leagueSeason}`,
  );
  const json = await response.json();
  return z.array(teamSchema).parse(json);
};

const getMatchData = async (groupOrderID?: number) => {
  const response = await fetch(
    `${baseUrl}/getmatchdata/${leagueShortcut}/${leagueSeason}/${groupOrderID ?? ""}`,
  );
  const json = await response.json();
  return z.array(matchSchema).parse(json);
};

const getMatchDataById = async (matchId: number) => {
  const response = await fetch(`${baseUrl}/getmatchdata/${matchId}`);
  const json = await response.json();
  return matchSchema.parse(json);
};

export const em = {
  getCurrentGroup,
  getAvailableGroups,
  getAvailableTeams,
  getMatchData,
  getMatchDataById,
};

export type Group = z.infer<typeof groupSchema>;
export type Team = z.infer<typeof teamSchema>;
export type Match = z.infer<typeof matchSchema>;
export type MatchResult = z.infer<typeof matchResultSchema>;
export type Goal = z.infer<typeof goalSchema>;
export type Location = z.infer<typeof locationSchema>;
