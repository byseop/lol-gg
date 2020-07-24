import React from 'react';
import RecentGamesSummary from './RecentGamesSummary';
import type { RecentGamesSummaryPropTypes } from './RecentGamesSummary';

export type RecentGamesSummaryContainerPropTypes = {} & RecentGamesSummaryPropTypes;

export default function RecentGamesSummaryContainer({
  recent10GamesStats
}: RecentGamesSummaryContainerPropTypes) {
  return <RecentGamesSummary recent10GamesStats={recent10GamesStats} />;
}
