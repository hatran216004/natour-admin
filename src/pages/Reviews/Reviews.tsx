import Heading from '../../components/Heading';
import Main from '../../components/Main';
import Pagination from '../../components/Pagination';
import ReviewRow from './components/ReviewRow';
import Table from '../../components/Table';
import Spinner from '../../components/Spinner';
import { Review } from '../../types/review.type';
import ReviewOperator from './components/ReviewOperator';
import useReviews from './hooks/useReviews';

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
          <div className="overflow-y-auto flex-1">
            <Table>
              <Table.Header
                data={[
                  'user',
                  'review',
                  'rating',
                  'tour',
                  'created at',
                  'actions'
                ]}
              />
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
