// fakeData.js
const productLists = [
  {
    id: 1,
    name: 'Laptop',
    category: 'Electronics',
    imageUrl: '/images/laptop.jpg'
  },
  {
    id: 2,
    name: 'Headphones',
    category: 'Electronics',
    imageUrl: '/images/headphone.jpg'
  },
  {
    id: 3,
    name: 'T-Shirt',
    category: 'Apparel',
    imageUrl: '/images/t-shirt.jpg'
  },
  {
    id: 4,
    name: 'Smartphone',
    category: 'Electronics',
    imageUrl: '/images/smartphone.jpg'
  },
  {
    id: 5,
    name: 'Sneakers',
    category: 'Apparel',
    imageUrl: '/images/sneakers.jpg'
  },
  {
    id: 6,
    name: 'Smartwatch',
    category: 'Electronics',
    imageUrl: '/images/smart-watch.jpg'
  },
  {
    id: 7,
    name: 'Jacket',
    category: 'Apparel',
    imageUrl: '/images/jacket.jpg'
  },
  {
    id: 8,
    name: 'Tablet',
    category: 'Electronics',
    imageUrl: '/images/tablet.jpg'
  },
  {
    id: 9,
    name: 'Backpack',
    category: 'Apparel',
    imageUrl: '/images/backpack.jpg'
  },
  {
    id: 10,
    name: 'Gaming Console',
    category: 'Electronics',
    imageUrl: '/images/gaming-console.jpg'
  },
  {
    id: 11,
    name: 'Socks',
    category: 'Apparel',
    imageUrl: '/images/socks.jpg'
  },
  {
    id: 12,
    name: 'Bluetooth Speaker',
    category: 'Electronics',
    imageUrl: '/images/bluetooth-speaker.jpg'
  },
  {
    id: 13,
    name: 'Pants',
    category: 'Apparel',
    imageUrl: '/images/pant.jpg'
  },
  {
    id: 14,
    name: 'Shirts',
    category: 'Apparel',
    imageUrl: '/images/shirt.jpg'
  },
  {
    id: 15,
    name: 'Cricket Bat',
    category: 'Games',
    imageUrl: '/images/cricket-bat.jpg'
  },
  {
    id: 16,
    name: 'Keyboard',
    category: 'Electronics',
    imageUrl: '/images/keyboard.jpg'
  },
  {
    id: 17,
    name: 'Mouse',
    category: 'Electronics',
    imageUrl: '/images/mouse.jpg'
  },
  {
    id: 18,
    name: 'Tooth Brush',
    category: 'Dental Care',
    imageUrl: '/images/tooth-brush.jpg'
  },
  {
    id: 19,
    name: 'Power Bank',
    category: 'Electronics',
    imageUrl: '/images/power-bank.jpg'
  },
  {
    id: 20,
    name: 'Suitcase',
    category: 'Apparel',
    imageUrl: '/images/suitcase.jpg'
  },
  {
    id: 21,
    name: 'Cricket Ball',
    category: 'Games',
    imageUrl: '/images/cricket-ball.jpg'
  }
];
var id=0
const products = {
  Laptop: [
    {
      id: ++id,
      img: 'https://images.pexels.com/photos/1181462/pexels-photo-1181462.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      name: 'Apple 2024 MacBook Air 13″ Laptop with M3 chip: 34.46 cm (13.6″) Liquid Retina Display, 8GB Unified Memory, 256GB SSD Storage, Backlit Keyboard, 1080p FaceTime HD Camera, Touch ID- Starlight',
      price: 104990,
      details: {
        processor: 'M3',
        memory: '8 GB RAM 512 GB SSD',
        storage: '256GB SSD',
        os: 'Mac OS',
        display: 'A BRILLIANT DISPLAY — The 34.46 cm (13.6″) Liquid Retina display supports 1 billion colours'
      }
    },
    {
      id: ++id,
      img: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      name: 'Acer Aspire Lite AMD Ryzen 5 5500U Premium Thin and Light Laptop (16 GB RAM/512 GB SSD/Windows 11 Home) AL15-41, 39.62 cm (15.6") Full HD Display, Metal Body, Steel Gray, 1.59 KG',
      price: 35990,
      details: {
        processor: 'AMD Ryzen 5 5500U Hexa-Core Mobile Processor with AMD Radeon Graphics',
        memory: 'RAM - 16 GB of Dual-channel DDR4, 2 SODIMM sockets',
        storage: '512 GB SSD NVMe solid-state drive storage (expandable up to 1TB) to store your files and media',
        os: 'Windows 11 Home',
        display: 'Experience sharp details and crisp colors on the 15.6" Full HD display, 16:9 aspect ratio, ultra-slim design and narrow bezels.'
      }
    },
    {
      id: ++id,
      img: 'https://images.pexels.com/photos/1181269/pexels-photo-1181269.jpeg?auto=compress&cs=tinysrgb&w=600',
      name: 'ASUS VivoBook 15 (2021), 15.6-inch (39.62 cm) HD, Dual Core Intel Celeron N4020, Thin and Light Laptop (4GB RAM/256GB SSD/Integrated Graphics/Windows 11 Home/Transparent Silver/1.8 Kg), X515MA-BR011W',
      price: 19990,
      details: {
        processor: 'Intel Celeron N4020, 1.1 GHz base speed, Up to 2.8 GHz Turbo Speed, 2 cores, 2 Threads, 4MB Cache',
        memory: '4GB SO-DIMM DDR4 2400MHz RAM, Support up to 8GB using 1x SO-DIMM Slot with',
        storage: '256GB M.2 NVMe PCIe SSD',
        os: 'Windows 11 Home',
        display: '35.56 cm (14 Inch) 1920 x 1080 Pixel'
      }
    },
    {
      id: ++id,
      img: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      name: 'Lenovo V15 Intel Celeron N4500 15.6" (39.62 cm) FHD (1920x1080) Antiglare 250 Nits Thin and Light Laptop (8GB RAM/256GB SSD/Windows 11 Home/Black/1Y Onsite/1.7 kg), 82QYA00MIN',
      price: 20480,
      details: {
        processor: 'Intel Celeron N4500 processor, base speed 1.1 Ghz, max speed 2.8 Ghz, 2 Cores, 4MB L3 smart cache',
        memory: '8GB DDR4 RAM 2933 MHz, dual-channel capable',
        storage: '256GB SSD M.2 upgradable up to 512GB SSD',
        os: 'Preloaded Windows 11 Home SL with Lifetime Validity',
        display: '15.6" (39.62 cm) screen with (1920x1080) FHD Antiglare, 250 Nits display'
      }
    },
    {
      id: ++id,
      img: 'https://images.pexels.com/photos/3776438/pexels-photo-3776438.jpeg?auto=compress&cs=tinysrgb&w=600',
      name: 'Dell Inspiron 7420 2in1 Laptop, Intel Core i7-1255U Processor/16GB/512GB/14.0" (35.56cm) FHD+ WVA Touch 250 nits, Active Pen/Win 11 + MSO' + '21, 15 Month McAfee/Backlit KB + FPR/Platinum Silver',
      price: 69990,
      details: {
        processor: 'Intel Core i3 11th Gen',
        memory: '16GB, 2x8GB, DDR4, 3200MHz',
        storage: '512GB SSD',
        os: 'Windows 11 Home + Office H&S 2021 + 15 Months McAfee Antivirus',
        display: '14.0" FHD+ WVA Truelife Touch Narrow Border 250 nits'
      }
    },
    {
      id: ++id,
      img: 'https://images.pexels.com/photos/17706650/pexels-photo-17706650/free-photo-of-man-sitting-with-newspaper-over-laptop.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      name: 'HP Laptop 15, 12th Gen i3-1215U, 15.6-inch (39.6 cm), FHD, Anti-Glare, 8GB DDR4, 512GB SSD, Intel UHD Graphics, Dual Speakers, (Win 11, MSO 2021, Silver, 1.69 kg), 15s-fy5006TU',
      price: 34990,
      details: {
        processor: 'Intel Core i3-1215U (up to 4.4 GHz with Intel Turbo Boost Technology, 10 MB L3 cache, 6 cores, 8 threads)',
        memory: '8 GB DDR4-3200 MHz RAM (1 x 8 GB)',
        storage: '512 GB PCIe NVMe M.2 SSD',
        os: 'Windows 11 Home Single Language |Microsoft Office Home & Student Edition 2021',
        display: '39.6 cm (15.6") diagonal, FHD (1920 x 1080), micro-edge, anti-glare, 250 nits, 45% NTSC'
      }
    }
  ]
}

module.exports = { productLists, products };
