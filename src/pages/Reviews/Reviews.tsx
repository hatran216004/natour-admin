import Heading from '../../components/Heading';
import Main from '../../components/Main';
import Pagination from '../../components/Pagination';
import ReviewRow from './components/ReviewRow';
import Table from '../../components/Table';
import Spinner from '../../components/Spinner';
import useReviews from '../../features/review/useReviews';
import { Review } from '../../types/review.type';
import ReviewOperator from './components/ReviewOperator';

export default function Reviews() {
  const { data, totalPages, isLoading } = useReviews();
  return (
    <Main>
      <div className="flex items-center justify-between">
        <Heading heading="manage reviews" />
        <ReviewOperator />
      </div>
      {isLoading && (
        <div className="h-full center">
          <Spinner size="lg" />
        </div>
      )}
      {!isLoading && (
        <>
          <div className="overflow-y-auto">
            <Table>
              <Table.Header>
                <tr>
                  <th scope="col" className="px-6 py-3 text-center">
                    user
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    review
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    rating
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    tour
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    created at
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    actions
                  </th>
                </tr>
              </Table.Header>
              <Table.Body
                data={data?.reviews}
                render={(review: Review) => {
                  return <ReviewRow key={review._id} review={review} />;
                }}
              />
            </Table>
          </div>
          <Pagination
            className="ml-auto mt-auto mb-[-8px]"
            totalPages={totalPages}
          />
        </>
      )}
    </Main>
  );
}
