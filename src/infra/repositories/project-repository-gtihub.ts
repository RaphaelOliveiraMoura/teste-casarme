import { Project } from "@/domain/entities/project";
import { IProjectRepository } from "@/domain/repositories/project-repository";

import { HttpClientServiceGithub } from "../services/http-client-service-github";

export class ProjectRepositoryGithub implements IProjectRepository {
  constructor(private readonly httpClient: HttpClientServiceGithub) {}

  async getProjectsByUser(
    id: string,
    page = 1,
  ): Promise<{ projects: Project[]; hasNextPage: boolean }> {
    const itemsPerPage = 8;

    const { data, headers } =
      await this.httpClient.get<ListUserRepositoriesGithubResponse>(
        `/users/${id}/repos?per_page=${itemsPerPage}&page=${page}`,
      );

    return {
      hasNextPage: headers.link?.includes('rel="next"'),
      projects: data.map(
        (repo) =>
          new Project({
            id: String(repo.id),
            description: repo.description,
            techs: repo.language ? [repo.language] : [],
            title: repo.name,
            updatedAt: repo.updated_at,
          }),
      ),
    };
  }
}

type ListUserRepositoriesGithubResponse = {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    id: 1;
    avatar_url: string;
    url: string;
  };
  private: boolean;
  description: string;
  fork: boolean;
  language: string | null;
  forks_count: number;
  stargazers_count: number;
  watchers_count: number;
  size: number;
  open_issues_count: number;
  topics: string[];
  visibility: "public";
  pushed_at: string;
  created_at: string;
  updated_at: string;
}[];
