import { FaPlusCircle } from 'react-icons/fa';
import Pagination from '../../components/Pagination';
import Spinner from '../../components/Spinner';
import Main from '../../components/Main';
import Table from '../../components/Table';
import Heading from '../../components/Heading';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import TourRow from './components/TourRow';
import { Tour } from '../../types/tour.type';
import CreateTourContent from './components/CreateTourContent';
import useTours from '../../features/tour/useTours';

export default function Tours() {
  const { tours, isLoading, totalPages } = useTours();

  return (
    <Main>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Heading heading="manage tours" />
          <Modal>
            <Modal.Open>
              <Button
                size="md"
                icon={<FaPlusCircle size={18} />}
                className="gap-3"
              >
                create new tour
              </Button>
            </Modal.Open>
            <Modal.Content>
              <CreateTourContent />
            </Modal.Content>
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
                    start location
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
