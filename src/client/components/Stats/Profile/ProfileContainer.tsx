import React from 'react';
import Profile from './Profile';
import type { ProfilePropTypes } from './Profile';

type ProfileContainerPropTypes = {} & ProfilePropTypes

export default function ProfileContainer({
  name,
  profileIconId
}: ProfileContainerPropTypes) {
  return <Profile name={name} profileIconId={profileIconId} />;
}
