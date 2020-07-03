import React from 'react';
import Profile, { ProfilePropTypes } from './Profile';

export default function ProfileContainer({
  name,
  profileIconId
}: ProfilePropTypes) {
  return <Profile name={name} profileIconId={profileIconId} />;
}
