import React from 'react';
import { LeagueTypes } from 'src/server/api/league/types';
import { ApolloError } from 'apollo-boost';

export type LeaguePropTypes = {
  data: LeagueTypes | undefined;
  loading: boolean;
  error: ApolloError | undefined;
};

export default function League({ data }: LeaguePropTypes) {
  return <div />;
}
