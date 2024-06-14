import { HttpClientService } from "@/domain/services/http-client-service";

export class HttpClientServiceFetch implements HttpClientService {
  async get<T>(
    url: string,
    params?: { headers?: Record<string, string> | undefined } | undefined,
  ): Promise<{ data: T; status: number }> {
    const response = await fetch(url, { headers: params?.headers });

    const data = await response.json();

    return { status: response.status, data };
  }
}
