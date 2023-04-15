import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

// svr 将使用在这里创建的轴提取器获取当前的 slash API，并将其存储在其全局存储中。

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher);

  // 返回所有这些字段，这些字段已从 SVR 库中提取
  return { data, error, isLoading, mutate}
};

export default useCurrentUser;
