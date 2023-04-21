import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import fetcher from "~/utils/fetcher";
import {
  type Permit,
  addPermits,
} from "~/features/permits/slices/permitsSlice";
import { usePermitsTransformer } from "~/features/permits/hooks/usePermitsTransformer";
import useSWRImmutable from "swr";
import type { RootState } from "~/store";

export const usePermits = () => {
  const appToken = process.env.NEXT_PUBLIC_SFGOV_APP_TOKEN || "";
  const markerLimit = 100;
  const url = `https://data.sfgov.org/resource/i98e-djp9.json?$limit=${markerLimit}&$$app_token=${appToken}&$order=permit_creation_date DESC`;
  const { data } = useSWRImmutable(url, fetcher);
  const dispatch = useDispatch();
  const permits = useSelector((state: RootState) => state.permits.value);
  const transformedData = usePermitsTransformer(data) as Permit[];

  useEffect(() => {
    if (data && permits.length === 0) {
      dispatch(addPermits(transformedData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return permits;
};
