import type { IGetStatisticsParams, IStatistics } from './types'
import type { IResponse } from '~/shared/types'
import { createSuspenseQuery } from 'react-query-kit'
import { httpClient } from '~/shared/lib/http-client'

export const useStatisticsQuery = createSuspenseQuery({
  queryKey: ['statistics'],
  fetcher: (params: IGetStatisticsParams) =>
    httpClient.get<IResponse<IStatistics>>('statistics', {
      searchParams: {
        ...params,
      },
    }).json(),
})
