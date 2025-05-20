import FilterSelect from '../../../components/FilterSelect';

export default function ReviewOperator() {
  return (
    <div className="flex items-center gap-8">
      <FilterSelect
        label="sort by"
        options={[
          { label: 'Most recent', value: '-createdAt' },
          {
            label: 'Oldest',
            value: 'createdAt'
          },
          { label: 'Highest rating', value: '-rating' },
          { label: 'Lowest rating', value: 'rating' }
        ]}
        field="sort"
      />
      <FilterSelect
        label="rating"
        operator="gte"
        options={[
          { label: '⭐ 5 stars', value: '5' },
          { label: '⭐ 4 stars and above', value: '4' },
          { label: '⭐ 3 stars and above', value: '3' },
          { label: '⭐ 2 stars and above', value: '2' },
          { label: '⭐ 1 stars and above', value: '1' }
        ]}
        field="rating"
      />
    </div>
  );
}
