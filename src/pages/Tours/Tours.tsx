import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FaPlusCircle } from 'react-icons/fa';
import { tourApi } from '../../services/tour.api';
import Pagination from '../../components/Pagination';
import Spinner from '../../components/Spinner';
import Main from '../../components/Main';
import Table from '../../components/Table';
import Heading from '../../components/Heading';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import TourRow from './components/TourRow';
import { Tour, ToursListConfig } from '../../types/tour.type';
import useQueryParms from '../../hooks/useQueryParms';
import { omitBy, isUndefined } from 'lodash';
import useUrl from '../../hooks/useUrl';

export default function Tours() {
  const { currentValue } = useUrl<number>({ field: 'page', defaultValue: 1 });
  const page = Number(currentValue);
  const queryClient = useQueryClient();
  const queryParams = useQueryParms<ToursListConfig>();
  const queryConfig: ToursListConfig = omitBy(
    {
      limit: Number(queryParams.limit) || 3,
      page: Number(queryParams.page) || 1,
      sort: queryParams.sort,
      name: queryParams.name,
      price: queryParams.price,
      duration: queryParams.duration,
      maxGroupSize: queryParams.maxGroupSize,
      difficulty: queryParams.difficulty,
      ratingsAverage: queryParams.ratingsAverage,
      ratingsQuantity: queryParams.ratingsQuantity,
      durationWeeks: queryParams.durationWeeks
    },
    isUndefined
  );

  const { data, isLoading } = useQuery({
    queryKey: ['tours', queryConfig],
    queryFn: () => tourApi.getAllTours(queryConfig)
  });

  const tours: Tour[] = data?.data.data.tours || [];
  const totalPages = data?.data.data.pagination.totalPages as number;

  if (page < totalPages) {
    queryClient.prefetchQuery({
      queryKey: ['tours', { ...queryConfig, page: page + 1 }],
      queryFn: () => tourApi.getAllTours({ ...queryConfig, page: page + 1 })
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['tours', { ...queryConfig, page: page - 1 }],
      queryFn: () => tourApi.getAllTours({ ...queryConfig, page: page - 1 })
    });
  }

  if (tours[0]) console.log(tours[0]);

  return (
    <Main>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Heading heading="manage tours" />
          <Modal>
            <Modal.Open openWindowName="create-tour">
              <Button
                size="md"
                icon={<FaPlusCircle size={18} />}
                className="gap-3"
              >
                create new tour
              </Button>
            </Modal.Open>
            <Modal.Window name="create-tour">
              <h1>test</h1>
            </Modal.Window>
          </Modal>
        </div>
        {/* TourOperator */}
      </div>
      {isLoading && (
        <div className="h-full center">
          <Spinner size="lg" />
        </div>
      )}
      {!isLoading && (
        <>
          <div className="overflow-x-auto h-full">
            <Table>
              <Table.Header>
                <tr className="text-nowrap">
                  <th scope="col" className="px-6 py-3 text-center">
                    name
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    image cover
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    starts location
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    starts day
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    difficulty
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    duration
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    guides
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    max group size
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    price
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    ratings
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    actions
                  </th>
                </tr>
              </Table.Header>
              <Table.Body
                data={tours}
                render={(tour: Tour) => <TourRow tour={tour} key={tour._id} />}
              />
            </Table>
          </div>
          <Pagination
            className="ml-auto mt-auto mb-[-12px]"
            totalPages={totalPages}
          />
        </>
      )}
    </Main>
  );
}
