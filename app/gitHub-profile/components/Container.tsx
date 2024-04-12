"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import UserInfo from "./UserInfo";
import RepositoryList from "./RepositoryList";
import Hero from "./Hero";
export interface UserData {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: any;
  blog: string;
  location: string;
  email: any;
  hireable: any;
  bio: string;
  twitter_username: any;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface Repository {
  id: number;
  name: string;
  description: string | null;
  license: {
    key: string;
    spdx_id: string;
  };
  forks_count: number;
  watchers_count: number;
  updated_at: string;
}

export default function Container() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [initialRepositoriesLimit, setInitialRepositoriesLimit] = useState<
    number | undefined
  >(4);
  const [searchQuery, setSearchQuery] = useState<string>("github");
  const [resultSearch, setResultSearch] = useState(null);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const fetchUserResult = useCallback(
    async (username: string = searchQuery) => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}`
        );
        const data = await response.json();
        setResultSearch(data);
      } catch (error) {}
    },
    [searchQuery]
  );
  const handleData = () => {
    setUserData(resultSearch);
  };

  const fetchUserRepositories = useCallback(async () => {
    if (userData) {
      try {
        const response = await fetch(userData.repos_url);
        const data = await response.json();
        setRepositories(data);
      } catch (error) {
        console.log("Error fetching user repositories:", error);
      }
    }
  }, [userData]);

  useEffect(() => {
    if (userData) {
      fetchUserRepositories();
    }
  }, [userData, fetchUserRepositories]);

  const handleShowAll = useCallback(() => {
    setInitialRepositoriesLimit((prevLimit) => (prevLimit ? undefined : 4));
  }, []);

  const limitRepositories = useMemo(
    () =>
      repositories.slice(0, initialRepositoriesLimit ?? repositories.length),
    [repositories, initialRepositoriesLimit]
  );

  return (
    <>
      <Hero
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        fetchData={fetchUserResult}
        results={resultSearch}
        handleData={handleData}
      />
      <div className="w-full min-h-80 bg-[#364153] px-2 md:px-0">
        <div className="lg:w-[980px] px-2 lg:px-0 lg:mx-auto">
          {userData && <UserInfo userData={userData} />}

          <RepositoryList
            repositories={limitRepositories}
            showAll={initialRepositoriesLimit !== undefined}
            onShowAll={handleShowAll}
          />
        </div>
      </div>
    </>
  );
}
