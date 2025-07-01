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
import useTours from './hooks/useTours';

export default function Tours() {
  const { tours, isLoading, totalPages } = useTours();

  return (
    <Main>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Heading heading="manage tours" />
          <Modal closeMethods={['button', 'escape']}>
            <Modal.Open name="create-tour">
              <Button
                size="md"
                icon={<FaPlusCircle size={18} />}
                className="gap-3"
              >
                create new tour
              </Button>
            </Modal.Open>
            <Modal.Content openName="create-tour">
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
          <div className="overflow-x-auto flex-1">
            <Table>
              <Table.Header
                data={[
                  'name',
                  'image cover',
                  'start location',
                  'starts day',
                  'difficulty',
                  'duration',
                  'guides',
                  'max group size',
                  'price',
                  'ratings',
                  'actions'
                ]}
              />
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
