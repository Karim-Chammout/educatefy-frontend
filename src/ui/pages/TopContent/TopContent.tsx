import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';

import { TopContentQuery } from '@/generated/graphql';
import { PageHeader, TopContentCard } from '@/ui/compositions';

type TopContentProps = {
  items: TopContentQuery['topContent']['items'];
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

const TopContent = ({ items, currentPage, pageCount, onPageChange }: TopContentProps) => {
  const { t } = useTranslation();

  return (
    <div style={{ marginTop: '16px' }}>
      <PageHeader title={t('topContent.heading')} subtitle={t('topContent.subheading')} />

      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid
            key={`${item.__typename}-${item.id}`}
            size={{ xxs: 12, sm: 6, md: 4, lg: 3 }}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <TopContentCard item={item} />
          </Grid>
        ))}
      </Grid>

      {pageCount > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
          <Pagination
            color="primary"
            page={currentPage}
            count={pageCount}
            onChange={(_, value) => onPageChange(value)}
          />
        </div>
      )}
    </div>
  );
};

export default TopContent;
