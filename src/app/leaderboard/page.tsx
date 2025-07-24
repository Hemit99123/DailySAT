"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LeaderboardEntry {
  _id: string;
  username: string;
  score: number;
  league: string;
}

const HomePage: React.FC = () => {
  const [selectedLeague, setSelectedLeague] = useState<string>("Bronze");
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);
  const fetchLeaderboardData = async (league: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/leaderboard?league=${league}`);
      if (!response.ok) {
        throw new Error("Failed to fetch leaderboard data");
      }
      const data = await response.json();
      setLeaderboardData(data.data);
    } catch (error) {
      setError("Failed to load leaderboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboardData(selectedLeague);
  }, [selectedLeague]);

  const handleLeagueChange = (value: string) => {
    setSelectedLeague(value);
  };

  return (
    <div className="md:w-3/5 sm:w-4/5 w-[90%]  mx-auto">
      <div className="mb-4">
        <Select value={selectedLeague} onValueChange={handleLeagueChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Platinum" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Bronze">Bronze</SelectItem>
            <SelectItem value="Silver">Silver</SelectItem>
            <SelectItem value="Gold">Gold</SelectItem>
            <SelectItem value="Platinum">Platinum</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table className="w-full rounded-t-lg overflow-hidden">
        <TableCaption id="leaderboard-caption">
          This is a list of the highest scores on DailySAT. Scores are
          determined by subtracting your incorrect from your correct answers.
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-[#2563EA] hover:bg-[#2563EA] text-white">
            <TableHead className="text-white rounded-tl-lg">Username</TableHead>
            <TableHead className="text-white">Score</TableHead>
            <TableHead className="text-white rounded-tr-lg">League</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-8">
                Loading...
              </TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center bg-gray-100 py-8">
                {error}
              </TableCell>
            </TableRow>
          ) : leaderboardData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center bg-gray-100 py-8">
                No data available for {selectedLeague} league
              </TableCell>
            </TableRow>
          ) : (
            leaderboardData.map((entry) => (
              <TableRow key={entry._id}>
                <TableCell className="max-w-[200px] overflow-hidden">
                  {entry.username}
                </TableCell>
                <TableCell>{entry.score}</TableCell>
                <TableCell>{entry.league}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default HomePage;
