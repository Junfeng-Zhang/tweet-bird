import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useUser = (userId: string) => {
  // 添加条件
  const { data, error, isLoading, mutate } = useSWR(userId ? `/api/users/${userId}` : null, fetcher);

  // 返回所有这些字段，这些字段已从 SVR 库中提取
  return { data, error, isLoading, mutate};
};

export default useUser;
