import ApartmentIcon from '@mui/icons-material/Apartment';

const menuItems = [
  {
    heading: 'Management',
    items: [
      {
        name: 'Companies',
        icon: ApartmentIcon,
        link: '/accent-header/management/commerce',
        items: [
          {
            name: 'Shop',
            link: 'management/commerce/shop',
          },
          {
            name: 'List',
            link: 'management/commerce/products/list',
          },
          {
            name: 'Details',
            link: 'management/commerce/products/single/1',
          },
          {
            name: 'Create',
            link: 'management/commerce/products/create',
          },
        ],
      },
    ],
  },
];

export default menuItems;
