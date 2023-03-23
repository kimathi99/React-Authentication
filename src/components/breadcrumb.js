import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    return {
      backgroundColor: theme.palette.common.white,
      height: theme.spacing(3),
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightRegular,
      '&:hover, &:focus': {
        backgroundColor: emphasize(theme.palette.common.white, 0.06),
      },
      '&:active': {
        boxShadow: theme.shadows[5],
        backgroundColor: emphasize(theme.palette.common.white, 0.12),
      },
    };
});
  
const CustomBreadcrumbsContainer = styled('nav')({
    backgroundColor: '#f0f0f0',
    padding: '3px',
  });
  
const Breadcrumb = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  const breadcrumbLinks = pathSegments.map((segment, index) => {
    const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    return (
      <StyledBreadcrumb
        key={url}
        component={Link}
        to={url}
        label={label}
      />
    );
  });

  return (
    <CustomBreadcrumbsContainer>
     <div className='breadcrumb' role="presentation" >
      <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
        <StyledBreadcrumb
          component={Link}
          to="/"
          label="Home"
          icon={<HomeIcon fontSize="small" />}
        />
        {breadcrumbLinks}
      </Breadcrumbs>
    </div>
    </CustomBreadcrumbsContainer>
  );
};

export default Breadcrumb;
