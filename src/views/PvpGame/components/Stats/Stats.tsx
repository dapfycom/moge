"use client";

import Collapse from "@/components/Collapse/Collapse";
import Loader1 from "@/components/ui-system/Loader/Loader1";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { PROJECT_TOKEN } from "@/config";
import useDisclosure from "@/hooks/useDisclosure";
import useGetElrondToken from "@/hooks/useGetElrondToken";
import { formatBalance } from "@/utils/functions/formatBalance";
import { formatTokenI } from "@/utils/functions/tokens";
import { ChevronDown, ChevronUp } from "lucide-react";
import { IStats } from "../../utils/interface";

interface IPorps {
  stats: IStats;
}

const Stats = ({ stats }: IPorps) => {
  const { isOpen, onToggle } = useDisclosure();

  const { elrondToken: mogeDetails, isLoading: loadingDetails } =
    useGetElrondToken(PROJECT_TOKEN);

  const isLoading = loadingDetails;
  return (
    <div className="my-4 ">
      <Collapse isOpen={isOpen}>
        <Card className="w-full max-w-3xl">
          <CardContent className="p-0">
            <div className="overflow-auto">
              {isLoading ? (
                <div className="min-h-[60px] flex justify-center items-center">
                  <Loader1 />
                </div>
              ) : (
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-semibold">
                        Games Played
                      </TableCell>
                      <TableCell>{stats.gamesPlayed}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold">
                        Total Volume
                      </TableCell>
                      <TableCell>
                        {formatBalance({
                          balance: stats.volume[0]?.amount || 0,
                          decimals: mogeDetails.decimals,
                        })}{" "}
                        {formatTokenI(PROJECT_TOKEN)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
            </div>
          </CardContent>
        </Card>
      </Collapse>

      <div className="flex justify-center mt-4">
        <Button variant={"outline"} onClick={onToggle} className="flex">
          {isOpen ? (
            <span className="flex items-center mr-1">
              <ChevronUp />
              Hide
            </span>
          ) : (
            <span className="flex items-center mr-1">
              <ChevronDown /> Show
            </span>
          )}{" "}
          Statistics
        </Button>
      </div>
    </div>
  );
};

export default Stats;
