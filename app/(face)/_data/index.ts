import { Home, List, Heart, ShoppingCart } from 'lucide-react';

export const accordionProductData = [
  {
    id: 1,
    title: 'Описание:',
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At libero alias totam obcaecati deserunt architecto magni quod qui eligendi, eveniet cumque, quae rem est maxime perferendis pariatur hic molestias eaque consequuntur a! Cum incidunt amet possimus, quos unde distinctio veritatis voluptate magni impedit dolor nihil error sit quidem odit fugiat.',
  },
  {
    id: 2,
    title: 'Характеристики:',
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At libero alias totam obcaecati deserunt architecto magni quod qui eligendi, eveniet cumque, quae rem est maxime perferendis pariatur hic molestias eaque consequuntur a! Cum incidunt amet possimus, quos unde distinctio veritatis voluptate magni impedit dolor nihil error sit quidem odit fugiat.',
  },
];

export const phoneLinks = [
  {id:1,href:'/',title:'Главная',icon: Home},
  {id:2,href:'/products',title:'Каталог',icon: List},
  {id:3,href:'/products/likes',title:'Избранное',icon: Heart},
  {id:4,href:'/products/cart',title:'Корзина',icon: ShoppingCart},
]