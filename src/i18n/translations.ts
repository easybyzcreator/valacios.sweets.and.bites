import { Language, HeaderSlide, ProductItem, DifferentialItem } from '../types';

export interface LocalizedProductCatalogItem {
  name: string;
  subname: string;
  badgeLabel: string;
  description: string;
  ingredients: string;
  allergens: string;
}

export interface TranslationDictionary {
  nav: {
    home: string;
    about: string;
    products: string;
    partner: string;
    whereToFind: string;
    contact: string;
    installApp: string;
    backToHome: string;
    ourStory: string;
  };
  carousel: HeaderSlide[];
  sobrePreview: {
    title: string;
    p1: string;
    p2: string;
    button: string;
  };
  wafflePreview: {
    title: string;
    description: string;
    benefits: {
      queijo: { title: string; desc: string };
      conservantes: { title: string; desc: string };
      assar: { title: string; desc: string };
    };
    viewAllBtn: string;
  };
  differentials: DifferentialItem[];
  gallery: {
    title: string;
    subtitle: string;
    clickToZoom: string;
    photos: {
      id: number;
      title: string;
      tag: string;
    }[];
  };
  contato: {
    badge: string;
    title: string;
    description: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    msgPlaceholder: string;
    whatsappBtn: string;
    submitBtn?: string;
    sending: string;
    successTitle: string;
    successMsg: string;
    distributedBy: string;
    companyName: string;
    companyCity: string;
  };
  sobrePage: {
    badge: string;
    subtitle: string;
    title: string;
    intro: string;
    creatorP1: string;
    quote: string;
    creatorP2: string;
    sinceText: string;
    sinceSub: string;
    pillarsHeading: string;
    pillars: {
      pilar: string;
      description: string;
    }[];
    btnProducts: string;
    btnBack: string;
  };
  produtosPage: {
    heroBadge?: string;
    heroTitle?: string;
    heroSubtitle?: string;
    backToHome: string;
    serving100g: string;
    serving50g: string;
    vdHeader: string;
    nutritionalInfo: string;
    component: string;
    energy: string;
    carbs: string;
    sugars: string;
    addedSugars: string;
    proteins: string;
    totalFat: string;
    saturatedFat: string;
    transFat: string;
    fiber: string;
    sodium: string;
    tableFootnote: string;
    ingredientsLabel: string;
    allergensLabel: string;
    requestPriceBtn: string;
    viewOfficialLabel: string;
    tableMode: string;
    labelMode: string;
    clickToZoom: string;
    closeModal: string;
    prevImage: string;
    nextImage: string;
    viewPackage: string;
    viewLabel: string;
    viewTable: string;
    prepWaffle: string;
    prepCheeseBread: string;
    whatsappInquiry: string;
    catalog: Record<string, LocalizedProductCatalogItem>;
  };
  modals: {
    close: string;
    partnerTitle: string;
    partnerSubtitle: string;
    partnerCall: string;
    nameEmpresaPlaceholder: string;
    whatsappPlaceholder: string;
    cityStatePlaceholder: string;
    partnerBtn: string;
    partnerGreeting: string;
    successTitle: string;
    successMsg: string;
    whereToFindTitle: string;
    whereToFindSubtitle: string;
    whereToFindText: string;
    whereToFindWhatsAppBtn: string;
    wantInMyStoreBtn?: string;
    locations: { title: string; desc: string }[];
    franchiseTitle: string;
    franchiseSubtitle: string;
    franchiseText: string;
  };
  pwaModal: {
    title: string;
    desc: string;
    step1: string;
    step2: string;
    step3: string;
    close: string;
  };
  footer: {
    sloganTitle: string;
    sloganDesc: string;
    navigation: string;
    social: string;
    distributedBy: string;
    rights: string;
    madeWithLove: string;
    developedBy: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  EN: {
    nav: {
      home: "HOME",
      about: "ABOUT",
      products: "PRODUCTS",
      partner: "BECOME A PARTNER",
      whereToFind: "WHERE TO FIND",
      contact: "CONTACT",
      installApp: "Install App",
      backToHome: "Back to Home",
      ourStory: "Our Story",
    },
    carousel: [
      {
        id: 1,
        scriptHeading: "The True Taste of Minas in Your Home",
        subtitle: "Authentic artisan Brazilian cheese bread, crispy on the outside and soft on the inside. Crafted with premium ingredients.",
        scriptColor: "#ffffff",
        subtitleColor: "#fef3c7",
        bgImage: "https://i.ibb.co/1fT9K3wS/Gemini-Generated-Image-fnj1eefnj1eefnj1.jpg",
        buttonText: "EXPLORE PRODUCTS",
        buttonTarget: "produtos",
        align: "center",
      },
      {
        id: 2,
        scriptHeading: "Discover the New Cheese Bread Waffle",
        subtitle: "A Valacio's Sweets & Bites exclusive combining convenience and irresistible crunch. You will fall in love!",
        scriptColor: "#ffffff",
        subtitleColor: "#ffffff",
        bgImage: "https://i.ibb.co/mCLcz1Hf/Gemini-Generated-Image-l6wc5kl6wc5kl6wc.jpg",
        buttonText: "VIEW PRODUCTS",
        buttonTarget: "produtos",
        align: "center",
      },
      {
        id: 3,
        scriptHeading: "Bring Valacio's to Your Business",
        subtitle: "Surprise your customers with authentic artisan Minas cheese bread. Bulk orders and shipping available!",
        scriptColor: "#ffffff",
        subtitleColor: "#fef3c7",
        bgImage: "https://i.ibb.co/LXqsvjhP/Gemini-Generated-Image-e36d7ge36d7ge36d.jpg",
        buttonText: "BECOME A PARTNER",
        buttonTarget: "parceiro",
        align: "center",
      },
      {
        id: 4,
        scriptHeading: "Much More Flavor\non the Way",
        subtitle: "From our oven straight to you. Coming soon: artisan brigadeiros, savory mini pies and new delicacies to sweeten every moment.",
        scriptColor: "#ffffff",
        subtitleColor: "#ffffff",
        bgImage: "https://i.ibb.co/v6Vpw3XF/Gemini-Generated-Image-sdy1qcsdy1qcsdy1.jpg",
        buttonText: "GET IN TOUCH",
        buttonTarget: "contato",
        align: "center",
      },
    ],
    sobrePreview: {
      title: "Lots of cheese, love and flavor",
      p1: "Valacio's Sweets & Bites was born from a passion for traditional recipes and the desire to bring genuine artisan flavor to your table. Made with premium ingredients and real cheese, our products deliver that golden crispy crust on the outside and a melt-in-your-mouth soft interior.",
      p2: "Whether for breakfast, an afternoon snack, or to delight guests at your coffee shop and market, each batch carries the best of tradition with a touch of innovation — including our exclusive cheese bread waffle and many more delights.",
      button: "CONTINUE READING",
    },
    wafflePreview: {
      title: "An Irresistible Novelty for Every Day",
      description: "In addition to our traditional and beloved Minas cheese bread, you can now experience the innovative Valacio's Cheese Bread Waffle. Convenient, crispy, and packed with real cheese in every bite.",
      benefits: {
        queijo: {
          title: "Made with Real Cheese",
          desc: "Noble and carefully selected ingredients, with no shortcuts on the cheese.",
        },
        conservantes: {
          title: "Zero Preservatives",
          desc: "Artisan recipe free of artificial flavors or added gluten, keeping the purity of genuine taste.",
        },
        assar: {
          title: "Ready to Bake",
          desc: "Straight from the freezer to the oven or air fryer. In just a few minutes, the magic happens.",
        },
      },
      viewAllBtn: "VIEW ALL PRODUCTS",
    },
    differentials: [
      {
        id: "facil-preparar",
        title: "EASY TO PREPARE",
        description: "Follow the package instructions and, in just a few minutes in the oven or air fryer, the authentic flavor comes alive.",
        image: "https://i.ibb.co/DgKSzjFK/Gemini-Generated-Image-ijk733ijk733ijk7.jpg",
        doodleRays: true,
      },
      {
        id: "sem-aromatizantes",
        title: "NO ARTIFICIAL FLAVORS",
        description: "An artisan recipe that never relies on artificial flavorings, preservatives or colorants. Pure quality from start to finish.",
        image: "https://i.ibb.co/XH0KKZg/Gemini-Generated-Image-yxm9ytyxm9ytyxm9.jpg",
        doodleRays: false,
      },
      {
        id: "irresistivel",
        title: "AND IRRESISTIBLE!",
        description: "We never cut back on cheese, because that is how true artisan cheese bread and top-tier waffles are made.",
        image: "https://i.ibb.co/G4t7xcQb/Gemini-Generated-Image-hfuf3uhfuf3uhfuf.jpg",
        doodleRays: true,
      },
    ],
    gallery: {
      title: "Photo Gallery",
      subtitle: "Mouth-watering delicacies",
      clickToZoom: "Click to zoom",
      photos: [
        { id: 1, title: "Artisan Cheese Bread with Creamy Dip", tag: "Cheddar" },
        { id: 2, title: "Golden Oven-Baked Cheese Bread Bowl", tag: "Fresh from Oven" },
        { id: 3, title: "Rustic Board with Guava Paste & Coffee", tag: "Romeu & Julieta" },
        { id: 4, title: "Artisan Brigadeiros, Sweets & Delicacies", tag: "Sweets & Bites" },
        { id: 5, title: "Warm Cheese Bread Batch with Coffee", tag: "Tradition" },
        { id: 6, title: "Molten Stretched Cheese Bread Pull", tag: "Real Cheese" },
        { id: 7, title: "Golden Crunchy Cheese Waffle Stack", tag: "Waffle" },
        { id: 8, title: "Freshly Baked Bread Straight from the Oven", tag: "Oven-Baked" },
        { id: 9, title: "Artisan Bread Serving on Rustic Wood", tag: "Minas Taste" },
        { id: 10, title: "Artisan Cheese Bread Basket Ready to Share", tag: "Family" },
        { id: 11, title: "Warm Fluffy Cheese Bread with Coffee", tag: "Breakfast" },
        { id: 12, title: "Valacio's Sweets & Gourmet Bites Showcase", tag: "Gourmet" },
      ],
    },
    contato: {
      badge: "GET IN TOUCH",
      title: "Bring Valacio's to Your Home or Business",
      description: "Want to guarantee our artisan cheese breads and waffles in your home freezer or offer high-quality specialty products in your grocery, café or market? We work directly with retail and wholesale orders. Reach out to become our partner!",
      namePlaceholder: "Your full name",
      emailPlaceholder: "Your email address",
      msgPlaceholder: "Add a message or inquiry",
      whatsappBtn: "Send Message",
      submitBtn: "SEND MESSAGE",
      sending: "SENDING...",
      successTitle: "Message received!",
      successMsg: "Thank you! We received your message and will reply shortly.",
      distributedBy: "DISTRIBUTED BY",
      companyName: "Valacio's Sweets Party & Bites, LLC",
      companyCity: "Joliet, IL 60435",
    },
    sobrePage: {
      badge: "OUR STORY",
      subtitle: "Valacio's Sweets & Bites",
      title: "Passion, Tradition & Authentic Flavor",
      intro: "More than recipes, we share memories and love through genuine artisan food.",
      creatorP1: "Valacio's Sweets & Bites was founded by Lea Valacio, carrying decades of passion for traditional Minas Gerais culinary heritage and home baking excellence.",
      quote: "Cooking is our purest way of expressing love, honoring traditions, and uniting family and friends around the table.",
      creatorP2: "Every product is handmade following authentic time-tested recipes, selecting premium artisan cheeses, and ensuring the perfect golden crunch outside and melt-in-your-mouth lightness inside.",
      sinceText: "Since the beginning",
      sinceSub: "Preserving genuine artisan tradition",
      pillarsHeading: "Our Core Pillars",
      pillars: [
        {
          pilar: "Flavor",
          description: "Noble and fresh ingredients hand-selected to deliver an unmatched taste experience.",
        },
        {
          pilar: "Creativity",
          description: "Innovative and exclusive products crafted with care for every customer.",
        },
        {
          pilar: "Dedication",
          description: "Deeply passionate about our craft, attentive to every single detail.",
        },
        {
          pilar: "Excellence",
          description: "Uncompromising commitment to quality and consumer delight.",
        },
      ],
      btnProducts: "Explore Our Products",
      btnBack: "Back to Home",
    },
    produtosPage: {
      heroBadge: "ARTISAN CATALOG",
      heroTitle: "Our Products",
      heroSubtitle: "Handcrafted with real cheese, premium ingredients and authentic Minas tradition",
      backToHome: "Back to Home",
      serving100g: "AMOUNT PER 100g",
      serving50g: "AMOUNT PER 50g",
      vdHeader: "%DV(*)",
      nutritionalInfo: "NUTRITION FACTS",
      component: "NUTRIENT",
      energy: "CALORIES",
      carbs: "TOTAL CARBOHYDRATES",
      sugars: "TOTAL SUGARS",
      addedSugars: "ADDED SUGARS",
      proteins: "PROTEIN",
      totalFat: "TOTAL FAT",
      saturatedFat: "SATURATED FAT",
      transFat: "TRANS FAT",
      fiber: "DIETARY FIBER",
      sodium: "SODIUM",
      tableFootnote: "* Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs. ** Daily Value not established.",
      ingredientsLabel: "Ingredients:",
      allergensLabel: "ALLERGENS:",
      requestPriceBtn: "REQUEST PRICE LIST / ORDER",
      viewOfficialLabel: "View Official Label",
      tableMode: "Table",
      labelMode: "Official Label",
      clickToZoom: "Click to zoom label",
      closeModal: "Close",
      prevImage: "Previous image",
      nextImage: "Next image",
      viewPackage: "View packaging",
      viewLabel: "View label",
      viewTable: "View nutrition table",
      prepWaffle: "5 min in toaster or oven",
      prepCheeseBread: "20 min in the oven",
      whatsappInquiry: "Hello! I would like to request the price list and place an order for {product} from Valacio's Sweets & Bites.",
      catalog: {
        tradicional: {
          name: "Traditional Brazilian Cheese Bread",
          subname: "Brazilian Cheese Bread",
          badgeLabel: "TRADITIONAL",
          description: "The authentic artisan Brazilian cheese bread, made with real cheese, crispy on the outside and incredibly soft on the inside.",
          ingredients: "Special sour and sweet manioc starch, cured artisan cheese, whole milk, eggs, vegetable oil. GLUTEN-FREE.",
          allergens: "ALLERGENS: CONTAINS MILK AND EGG DERIVATIVES. CONTAINS LACTOSE.",
        },
        goiabada: {
          name: "Cheese Bread with Guava",
          subname: "Filled Brazilian Cheese Bread",
          badgeLabel: "CHEESE BREAD WITH GUAVA",
          description: "The perfect harmony of savory artisan cheese and creamy guava paste. An unforgettable classic Romeo & Juliet flavor.",
          ingredients: "Special manioc starch, artisan cheese, premium creamy guava paste, milk, eggs, vegetable oil. GLUTEN-FREE.",
          allergens: "ALLERGENS: CONTAINS MILK AND EGG DERIVATIVES. CONTAINS LACTOSE.",
        },
        jalapeno: {
          name: "Jalapeño Cheese Bread",
          subname: "Spiced Brazilian Cheese Bread",
          badgeLabel: "JALAPEÑO CHEESE BREAD",
          description: "For spice lovers: the perfect balance between artisan cheese richness and the vibrant, aromatic kick of real jalapeño pepper.",
          ingredients: "Special manioc starch, artisan cheese, selected jalapeño pepper flakes, whole milk, eggs, vegetable oil. GLUTEN-FREE.",
          allergens: "ALLERGENS: CONTAINS MILK AND EGG DERIVATIVES. CONTAINS LACTOSE.",
        },
        waffle: {
          name: "Cheese Bread Waffle",
          subname: "Artisan Cheese Waffle",
          badgeLabel: "CHEESE BREAD WAFFLE",
          description: "Innovation and irresistible crunch: the unique flavor of Brazilian cheese bread in a convenient waffle shape. Straight from the freezer to your toaster, oven or air fryer!",
          ingredients: "Special sour and sweet manioc starch, cured artisan cheese, whole milk, eggs, vegetable oil. GLUTEN-FREE.",
          allergens: "ALLERGENS: CONTAINS MILK AND EGG DERIVATIVES. CONTAINS LACTOSE.",
        },
      },
    },
    modals: {
      close: "Close",
      partnerTitle: "BECOME A PARTNER",
      partnerSubtitle: "Bring genuine Brazilian cheese bread and exclusive artisan products to your business.",
      partnerCall: "Do you own a café, specialty shop, bakery, hotel, supermarket, or retail store and would like to carry our products?",
      nameEmpresaPlaceholder: "Contact name & company name",
      whatsappPlaceholder: "(###) ###-####",
      cityStatePlaceholder: "City / State",
      partnerBtn: "BECOME A RESELLER PARTNER",
      partnerGreeting: "Hello! I am interested in becoming a Valacio's reseller/partner.",
      successTitle: "Inquiry Sent Successfully!",
      successMsg: "Our commercial representative will contact you via WhatsApp shortly.",
      whereToFindTitle: "WHERE TO FIND",
      whereToFindSubtitle: "Retail locations and direct delivery across regions",
      whereToFindText: "We distribute directly to specialty stores, Brazilian markets, coffee shops and restaurants. Want to carry our products in your business? Click below to become a partner!",
      whereToFindWhatsAppBtn: "Inquire on WhatsApp",
      wantInMyStoreBtn: "I want to have the products in my store!",
      locations: [
        {
          title: "International Fresh Market",
          desc: "Naperville, Illinois.",
        },
        {
          title: "El Guero",
          desc: "Crest Hill, Illinois.",
        },
        {
          title: "Garden Fresh Market",
          desc: "Mundelein, IL.",
        },
      ],
      franchiseTitle: "BECOME A FRANCHISEE",
      franchiseSubtitle: "Invest in a proven brand with strong growth potential",
      franchiseText: "Join our retail network with turnkey kiosk or street shop formats. Streamlined operations, loved products, and comprehensive launch support.",
    },
    pwaModal: {
      title: "How to Install on iPhone / iPad",
      desc: "Install this app on your device for instant offline access and the best experience:",
      step1: "Tap the Share button in Safari toolbar below",
      step2: "Scroll down and tap 'Add to Home Screen'",
      step3: "Tap 'Add' in the top right corner. Done!",
      close: "Close",
    },
    footer: {
      sloganTitle: "The True Taste of Minas in Your Home",
      sloganDesc: "Artisan Brazilian cheese bread, crunchy on the outside and soft on the inside. Made with premium ingredients.",
      navigation: "Navigation",
      social: "Social Media",
      distributedBy: "Distributed By",
      rights: "All rights reserved.",
      madeWithLove: "Crafted with real cheese and warm artisan care",
      developedBy: "Developed by",
    },
  },

  PT: {
    nav: {
      home: "INÍCIO",
      about: "SOBRE",
      products: "PRODUTOS",
      partner: "SEJA UM PARCEIRO",
      whereToFind: "ONDE ENCONTRAR",
      contact: "CONTATO",
      installApp: "Instalar App",
      backToHome: "Voltar ao início",
      ourStory: "Nossa História",
    },
    carousel: [
      {
        id: 1,
        scriptHeading: "O Verdadeiro Sabor de Minas na Sua Casa",
        subtitle: "Pão de queijo artesanal de verdade, crocante por fora e macio por dentro. Feito com ingredientes nobres.",
        scriptColor: "#ffffff",
        subtitleColor: "#fef3c7",
        bgImage: "https://i.ibb.co/1fT9K3wS/Gemini-Generated-Image-fnj1eefnj1eefnj1.jpg",
        buttonText: "CONHECER PRODUTOS",
        buttonTarget: "produtos",
        align: "center",
      },
      {
        id: 2,
        scriptHeading: "Conheça o Novo Waffle de Pão de Queijo",
        subtitle: "Uma exclusividade Valacio's Sweets & Bites que une praticidade e uma crocância irresistível. Você vai se apaixonar!",
        scriptColor: "#ffffff",
        subtitleColor: "#ffffff",
        bgImage: "https://i.ibb.co/mCLcz1Hf/Gemini-Generated-Image-l6wc5kl6wc5kl6wc.jpg",
        buttonText: "VER PRODUTOS",
        buttonTarget: "produtos",
        align: "center",
      },
      {
        id: 3,
        scriptHeading: "Leve a Valacio's para o Seu Negócio",
        subtitle: "Surpreenda seus clientes com o autêntico pão de queijo mineiro. Atendemos atacado e varejo!",
        scriptColor: "#ffffff",
        subtitleColor: "#fef3c7",
        bgImage: "https://i.ibb.co/LXqsvjhP/Gemini-Generated-Image-e36d7ge36d7ge36d.jpg",
        buttonText: "SEJA UM PARCEIRO",
        buttonTarget: "parceiro",
        align: "center",
      },
      {
        id: 4,
        scriptHeading: "Muito Mais Sabor\na Caminho",
        subtitle: "Do nosso forno direto para você. Em breve: brigadeiros artesanais, empadas e novas delícias para adoçar cada momento.",
        scriptColor: "#ffffff",
        subtitleColor: "#ffffff",
        bgImage: "https://i.ibb.co/v6Vpw3XF/Gemini-Generated-Image-sdy1qcsdy1qcsdy1.jpg",
        buttonText: "ENTRAR EM CONTATO",
        buttonTarget: "contato",
        align: "center",
      },
    ],
    sobrePreview: {
      title: "Muito queijo, afeto e sabor",
      p1: "A Valacio's Sweets & Bites nasceu da paixão por receitas tradicionais e do desejo de levar o verdadeiro sabor artesanal à sua mesa. Feito com ingredientes nobres e muito queijo de verdade, nossos produtos entregam aquela casquinha dourada e crocante por fora, com um interior incrivelmente macio.",
      p2: "Seja no café da manhã, no lanche da tarde ou para encantar clientes no seu estabelecimento, cada fornada traz o melhor da tradição mineira com um toque de inovação — incluindo nosso exclusivo waffle de pão de queijo e muitas outras delícias.",
      button: "CONTINUAR LENDO",
    },
    wafflePreview: {
      title: "Uma Novidade Irresistível para o Seu Dia",
      description: "Além do nosso tradicional e amado pão de queijo mineiro, agora você pode experimentar o inovador Waffle de Pão de Queijo Valacio's. Prático, crocante e com muito queijo de verdade em cada pedaço.",
      benefits: {
        queijo: {
          title: "Muito Queijo de Verdade",
          desc: "Ingredientes nobres e selecionados, sem economizar no queijo.",
        },
        conservantes: {
          title: "Zero Conservantes",
          desc: "Receita artesanal, sem aromatizantes artificiais e sem adição de glúten, mantendo a pureza do sabor.",
        },
        assar: {
          title: "Pronto para Assar",
          desc: "Direto do freezer para o forno ou air fryer. Em poucos minutos, a mágica acontece.",
        },
      },
      viewAllBtn: "VER TODOS OS PRODUTOS",
    },
    differentials: [
      {
        id: "facil-preparar",
        title: "FÁCIL DE PREPARAR",
        description: "Basta seguir as instruções da embalagem e, em poucos minutos no forno ou na air fryer, o sabor autêntico ganha vida.",
        image: "https://i.ibb.co/DgKSzjFK/Gemini-Generated-Image-ijk733ijk733ijk7.jpg",
        doodleRays: true,
      },
      {
        id: "sem-aromatizantes",
        title: "SEM AROMATIZANTES",
        description: "Receita artesanal que não leva aromatizantes, conservantes ou corantes artificiais. Pura qualidade de ponta a ponta.",
        image: "https://i.ibb.co/XH0KKZg/Gemini-Generated-Image-yxm9ytyxm9ytyxm9.jpg",
        doodleRays: false,
      },
      {
        id: "irresistivel",
        title: "E IRRESISTÍVEL!",
        description: "A gente não economiza no queijo, porque é assim que se faz um pão de queijo de verdade e waffles de altíssimo nível.",
        image: "https://i.ibb.co/G4t7xcQb/Gemini-Generated-Image-hfuf3uhfuf3uhfuf.jpg",
        doodleRays: true,
      },
    ],
    gallery: {
      title: "Galeria de fotos",
      subtitle: "De dar água na boca",
      clickToZoom: "Clique para ampliar",
      photos: [
        { id: 1, title: "Pão de Queijo com Molho Cremoso", tag: "Cheddar" },
        { id: 2, title: "Tigela de Pães Dourados na Porcelana", tag: "Recém-assado" },
        { id: 3, title: "Tábua com Goiabada Cascão & Café", tag: "Romeu & Julieta" },
        { id: 4, title: "Doces, Brigadeiros e Novidades", tag: "Sweets & Bites" },
        { id: 5, title: "Fornada Quentinha de Pão de Queijo", tag: "Tradição" },
        { id: 6, title: "Recheio Puxando Puro Queijo de Verdade", tag: "Puro Queijo" },
        { id: 7, title: "Waffle de Pão de Queijo Crocante Dourado", tag: "Waffle" },
        { id: 8, title: "Pão de Queijo Recém-saído do Forno", tag: "No Forno" },
        { id: 9, title: "Porção Artesanal Servida na Madeira", tag: "Sabor de Minas" },
        { id: 10, title: "Cesto de Pães de Queijo para a Família", tag: "Família" },
        { id: 11, title: "Café Colonial com Pão de Queijo Macio", tag: "Café da Manhã" },
        { id: 12, title: "Doces Finos & Delícias Valacio's", tag: "Gourmet" },
      ],
    },
    contato: {
      badge: "FALE CONOSCO",
      title: "Leve a Valacio's para Sua Casa ou Seu Negócio",
      description: "Quer garantir nossos pães de queijo e waffles artesanais no freezer de casa ou oferecer produtos de alta qualidade no seu empório, café ou mercado? Atendemos pedidos no varejo e no atacado. Fale com a gente para ser nosso parceiro!",
      namePlaceholder: "Seu nome completo",
      emailPlaceholder: "Seu melhor e-mail",
      msgPlaceholder: "Deixe sua mensagem ou dúvida",
      whatsappBtn: "Enviar Mensagem",
      submitBtn: "ENVIAR MENSAGEM",
      sending: "ENVIANDO...",
      successTitle: "Mensagem enviada com sucesso!",
      successMsg: "Obrigado! Sua mensagem foi enviada com sucesso e entraremos em contato em breve.",
      distributedBy: "DISTRIBUÍDO POR",
      companyName: "Valacio's Sweets Party & Bites, LLC",
      companyCity: "Joliet, IL 60435",
    },
    sobrePage: {
      badge: "NOSSA HISTÓRIA",
      subtitle: "Valacio's Sweets & Bites",
      title: "Amor, Tradição e Sabor Autêntico",
      intro: "Mais do que receitas, compartilhamos afeto e memórias através do sabor legítimo.",
      creatorP1: "A Valacio's Sweets & Bites nasceu das mãos de Lea Valacio, unindo décadas de paixão pela autêntica culinária mineira e o carinho da confeitaria e panificação artesanal.",
      quote: "Cozinhar é a nossa forma mais pura de expressar afeto, honrar tradições e reunir quem amamos ao redor da mesa.",
      creatorP2: "Cada receita é preparada artesanalmente, com queijos nobres de alta qualidade, garantindo aquela casquinha dourada crocante por fora e a maciez inconfundível por dentro.",
      sinceText: "Desde o início",
      sinceSub: "Mantendo viva a tradição artesanal",
      pillarsHeading: "Nossos Pilares",
      pillars: [
        {
          pilar: "Sabor",
          description: "Ingredientes selecionados e frescos para entregar uma experiência inesquecível.",
        },
        {
          pilar: "Criatividade",
          description: "Produtos inovadores e exclusivos pensados com carinho para cada cliente.",
        },
        {
          pilar: "Dedicação",
          description: "Amor pelo que fazemos e atenção especial a cada detalhe da receita.",
        },
        {
          pilar: "Excelência",
          description: "Compromisso inegociável com a qualidade e a satisfação de quem prova.",
        },
      ],
      btnProducts: "Conhecer Nossos Produtos",
      btnBack: "Voltar ao Início",
    },
    produtosPage: {
      heroBadge: "LINHA ARTESANAL",
      heroTitle: "Nossos Produtos",
      heroSubtitle: "Feito com amor, tradição e muito queijo de verdade em cada receita",
      backToHome: "Voltar ao início",
      serving100g: "QUANT. POR 100g",
      serving50g: "QUANT. POR 50g",
      vdHeader: "%VD(*)",
      nutritionalInfo: "INFORMAÇÕES NUTRICIONAIS",
      component: "COMPONENTE",
      energy: "VALOR ENERGÉTICO",
      carbs: "CARBOIDRATOS",
      sugars: "AÇÚCARES TOTAIS",
      addedSugars: "AÇÚCARES ADICIONADOS",
      proteins: "PROTEÍNAS",
      totalFat: "GORDURAS TOTAIS",
      saturatedFat: "GORDURAS SATURADAS",
      transFat: "GORDURAS TRANS",
      fiber: "FIBRA ALIMENTAR",
      sodium: "SÓDIO",
      tableFootnote: "* % Valores Diários de referência com base em uma dieta de 2.000 kcal ou 8.400 kJ. Seus valores diários podem ser maiores ou menores dependendo de suas necessidades energéticas. ** VD não estabelecido.",
      ingredientsLabel: "Ingredientes:",
      allergensLabel: "ALÉRGICOS:",
      requestPriceBtn: "SOLICITAR TABELA DE PREÇOS / PEDIDO",
      viewOfficialLabel: "Ver Rótulo Oficial",
      tableMode: "Tabela",
      labelMode: "Rótulo Oficial",
      clickToZoom: "Clique para ampliar o rótulo",
      closeModal: "Fechar",
      prevImage: "Imagem anterior",
      nextImage: "Próxima imagem",
      viewPackage: "Ver embalagem",
      viewLabel: "Ver rótulo",
      viewTable: "Ver tabela",
      prepWaffle: "5 min no forno ou torradeira",
      prepCheeseBread: "20 min no forno",
      whatsappInquiry: "Olá! Gostaria de solicitar a tabela de preços e fazer um pedido do {product} da Valacio's Sweets & Bites.",
      catalog: {
        tradicional: {
          name: "Pão de Queijo Tradicional",
          subname: "Pão de queijo",
          badgeLabel: "TRADICIONAL",
          description: "O autêntico pão de queijo mineiro, feito com queijo de verdade, crocante por fora e incrivelmente macio por dentro.",
          ingredients: "Polvilho azedo e doce especial, queijo artesanal meia cura, leite integral, ovos e óleo vegetal. NÃO CONTÉM GLÚTEN.",
          allergens: "ALÉRGICOS: CONTÉM DERIVADOS DE LEITE E OVOS. CONTÉM LACTOSE.",
        },
        goiabada: {
          name: "Pão de Queijo com Goiabada",
          subname: "Pão de queijo recheado",
          badgeLabel: "PÃO DE QUEIJO COM GOIABADA",
          description: "A união perfeita do salgadinho do queijo com a doçura da goiabada cascão cremosa. Um clássico Romeu e Julieta inesquecível.",
          ingredients: "Polvilho especial, queijo artesanal, goiabada cremosa selecionada, leite, ovos e óleo vegetal. NÃO CONTÉM GLÚTEN.",
          allergens: "ALÉRGICOS: CONTÉM DERIVADOS DE LEITE E OVOS. CONTÉM LACTOSE.",
        },
        jalapeno: {
          name: "Pão de Queijo Jalapeño",
          subname: "Pão de queijo temperado",
          badgeLabel: "PÃO DE QUEIJO JALAPENO",
          description: "Para quem ama intensidade: o equilíbrio perfeito entre a cremosidade do queijo e o toque picante e aromático da pimenta jalapeño.",
          ingredients: "Polvilho especial, queijo artesanal, flocos de pimenta jalapeño selecionada, leite integral, ovos e óleo vegetal. NÃO CONTÉM GLÚTEN.",
          allergens: "ALÉRGICOS: CONTÉM DERIVADOS DE LEITE E OVOS. CONTÉM LACTOSE.",
        },
        waffle: {
          name: "Waffle de Pão de Queijo",
          subname: "Waffle artesanal",
          badgeLabel: "WAFFLE DE PÃO DE QUEIJO",
          description: "Inovação e crocância incomparável: o sabor único do pão de queijo mineiro no prático formato de waffle. Direto do freezer para a torradeira, forno ou air fryer!",
          ingredients: "Polvilho azedo e doce especial, queijo artesanal meia cura, leite integral, ovos e óleo vegetal. NÃO CONTÉM GLÚTEN.",
          allergens: "ALÉRGICOS: CONTÉM DERIVADOS DE LEITE E OVOS. CONTÉM LACTOSE.",
        },
      },
    },
    modals: {
      close: "Fechar",
      partnerTitle: "SEJA UM PARCEIRO",
      partnerSubtitle: "Leve o legítimo pão de queijo mineiro e produtos artesanais exclusivos para o seu negócio.",
      partnerCall: "Você é dono de cafeteria, empório, padaria, hotel, supermercado ou uma loja e gostaria de ter nossos produtos?",
      nameEmpresaPlaceholder: "Nome do responsável e da empresa",
      whatsappPlaceholder: "(###) ###-####",
      cityStatePlaceholder: "Cidade / Estado",
      partnerBtn: "QUERO SER UM PARCEIRO REVENDEDOR",
      partnerGreeting: "Olá! Tenho interesse em ser um parceiro revendedor Valacio's.",
      successTitle: "Solicitação Recebida com Sucesso!",
      successMsg: "Sua solicitação foi salva no sistema com sucesso. Entraremos em contato em breve!",
      whereToFindTitle: "ONDE ENCONTRAR",
      whereToFindSubtitle: "Pontos de venda e parceiros oficiais",
      whereToFindText: "Encontre os produtos Valacio's nos seguintes estabelecimentos parceiros:",
      whereToFindWhatsAppBtn: "Consultar no WhatsApp",
      wantInMyStoreBtn: "Quero ter os produtos na minha loja!",
      locations: [
        {
          title: "International Fresh Market",
          desc: "em Naperville, Illinois.",
        },
        {
          title: "El Guero",
          desc: "in Crest Hill, Illinois.",
        },
        {
          title: "Garden Fresh Market",
          desc: "in Mundelein, IL.",
        },
      ],
      franchiseTitle: "SEJA UM FRANQUEADO",
      franchiseSubtitle: "Invista em uma marca consolidada com alto potencial",
      franchiseText: "Faça parte da nossa rede com formato de quiosque ou loja de rua. Operação simplificada, produtos de altíssima aceitação e suporte completo na implantação.",
    },
    pwaModal: {
      title: "Como instalar no iPhone / iPad",
      desc: "Instale este aplicativo no seu aparelho para acesso rápido, offline e com a melhor experiência:",
      step1: "Toque no ícone de compartilhamento na barra inferior do Safari",
      step2: "Role para baixo e selecione 'Adicionar à Tela de Início'",
      step3: "Toque em 'Adicionar' no canto superior direito. Pronto!",
      close: "Fechar",
    },
    footer: {
      sloganTitle: "O Verdadeiro Sabor de Minas na Sua Casa",
      sloganDesc: "Pão de queijo artesanal de verdade, crocante por fora e macio por dentro. Feito com ingredientes nobres.",
      navigation: "Navegação",
      social: "Redes Sociais",
      distributedBy: "DISTRIBUÍDO POR",
      rights: "Todos os direitos reservados.",
      madeWithLove: "Feito com muito queijo e amor mineiro",
      developedBy: "Desenvolvido por",
    },
  },

  ES: {
    nav: {
      home: "INICIO",
      about: "SOBRE NOSOTROS",
      products: "PRODUCTOS",
      partner: "SÉ UN SOCIO",
      whereToFind: "DÓNDE ENCONTRAR",
      contact: "CONTACTO",
      installApp: "Instalar App",
      backToHome: "Volver al inicio",
      ourStory: "Nuestra Historia",
    },
    carousel: [
      {
        id: 1,
        scriptHeading: "El Verdadero Sabor de Minas en Tu Casa",
        subtitle: "Auténtico pan de queso artesanal brasileño, crujiente por fuera y suave por dentro. Elaborado con ingredientes nobles.",
        scriptColor: "#ffffff",
        subtitleColor: "#fef3c7",
        bgImage: "https://i.ibb.co/1fT9K3wS/Gemini-Generated-Image-fnj1eefnj1eefnj1.jpg",
        buttonText: "CONOCER PRODUCTOS",
        buttonTarget: "produtos",
        align: "center",
      },
      {
        id: 2,
        scriptHeading: "Descubre el Nuevo Waffle de Pan de Queso",
        subtitle: "Una exclusividad de Valacio's Sweets & Bites que combina practicidad y un crujiente irresistible. ¡Te vas a enamorar!",
        scriptColor: "#ffffff",
        subtitleColor: "#ffffff",
        bgImage: "https://i.ibb.co/mCLcz1Hf/Gemini-Generated-Image-l6wc5kl6wc5kl6wc.jpg",
        buttonText: "VER PRODUCTOS",
        buttonTarget: "produtos",
        align: "center",
      },
      {
        id: 3,
        scriptHeading: "Lleve Valacio's a Su Negocio",
        subtitle: "Sorprenda a sus clientes con el auténtico pan de queso artesanal. ¡Atendemos ventas mayoristas y minoristas!",
        scriptColor: "#ffffff",
        subtitleColor: "#fef3c7",
        bgImage: "https://i.ibb.co/LXqsvjhP/Gemini-Generated-Image-e36d7ge36d7ge36d.jpg",
        buttonText: "SÉ UN SOCIO",
        buttonTarget: "parceiro",
        align: "center",
      },
      {
        id: 4,
        scriptHeading: "Mucho Más Sabor\nen Camino",
        subtitle: "De nuestro horno directo para usted. Muy pronto: brigadeiros artesanales, tartaletas y nuevas delicias para endulzar cada momento.",
        scriptColor: "#ffffff",
        subtitleColor: "#ffffff",
        bgImage: "https://i.ibb.co/v6Vpw3XF/Gemini-Generated-Image-sdy1qcsdy1qcsdy1.jpg",
        buttonText: "CONTACTAR",
        buttonTarget: "contato",
        align: "center",
      },
    ],
    sobrePreview: {
      title: "Mucho queso, cariño y sabor",
      p1: "Valacio's Sweets & Bites nació de la pasión por las recetas tradicionales y del deseo de llevar el auténtico sabor artesanal a su mesa. Elaborados con ingredientes nobles y verdadero queso de calidad, nuestros productos ofrecen una costra dorada y crujiente por fuera y un interior suave y esponjoso.",
      p2: "Ya sea en el desayuno, en la merienda o para deleitar a los clientes de su cafetería o mercado, cada horneada trae lo mejor de la tradición con un toque de innovación — incluyendo nuestro exclusivo waffle de pan de queso y muchas delicias más.",
      button: "SEGUIR LEYENDO",
    },
    wafflePreview: {
      title: "Una Novedad Irresistible para Cada Día",
      description: "Además de nuestro tradicional y querido pan de queso de Minas, ahora puede probar el innovador Waffle de Pan de Queso Valacio's. Práctico, crujiente y con auténtico queso en cada bocado.",
      benefits: {
        queijo: {
          title: "Auténtico Queso de Verdad",
          desc: "Ingredientes nobles y seleccionados con esmero, sin escatimar en el queso.",
        },
        conservantes: {
          title: "Cero Conservantes",
          desc: "Receta artesanal, sin aromatizantes artificiales ni gluten añadido, manteniendo la pureza del sabor original.",
        },
        assar: {
          title: "Listo para Hornear",
          desc: "Directo del congelador al horno o air fryer. En pocos minutos, la magia está lista.",
        },
      },
      viewAllBtn: "VER TODOS LOS PRODUCTOS",
    },
    differentials: [
      {
        id: "facil-preparar",
        title: "FÁCIL DE PREPARAR",
        description: "Basta seguir las instrucciones del paquete y, en pocos minutos al horno o en la air fryer, el auténtico sabor cobra vida.",
        image: "https://i.ibb.co/DgKSzjFK/Gemini-Generated-Image-ijk733ijk733ijk7.jpg",
        doodleRays: true,
      },
      {
        id: "sem-aromatizantes",
        title: "SIN AROMATIZANTES",
        description: "Receta artesanal que no contiene saborizantes, conservantes ni colorantes artificiales. Máxima calidad de principio a fin.",
        image: "https://i.ibb.co/XH0KKZg/Gemini-Generated-Image-yxm9ytyxm9ytyxm9.jpg",
        doodleRays: false,
      },
      {
        id: "irresistivel",
        title: "¡E IRRESISTIBLE!",
        description: "No escatimamos en queso, porque así es como se prepara el verdadero pan de queso artesanal y waffles de primer nivel.",
        image: "https://i.ibb.co/G4t7xcQb/Gemini-Generated-Image-hfuf3uhfuf3uhfuf.jpg",
        doodleRays: true,
      },
    ],
    gallery: {
      title: "Galería de fotos",
      subtitle: "Para hacer agua la boca",
      clickToZoom: "Clic para ampliar",
      photos: [
        { id: 1, title: "Pan de Queso con Salsa Cremosa", tag: "Cheddar" },
        { id: 2, title: "Plato de Panes de Queso Dorados", tag: "Recién Horneado" },
        { id: 3, title: "Tabla con Guayabada & Café", tag: "Romeu & Julieta" },
        { id: 4, title: "Dulces, Brigadeiros y Delicias", tag: "Sweets & Bites" },
        { id: 5, title: "Hornada Caliente de Pan de Queso", tag: "Tradición" },
        { id: 6, title: "Relleno Fundido de Puro Queso", tag: "Puro Queso" },
        { id: 7, title: "Waffle de Pan de Queso Crujiente", tag: "Waffle" },
        { id: 8, title: "Pan de Queso Recién Salido del Horno", tag: "Al Horno" },
        { id: 9, title: "Porción Artesanal en Madera", tag: "Sabor Brasileño" },
        { id: 10, title: "Cesta de Panes de Queso para Compartir", tag: "Familia" },
        { id: 11, title: "Desayuno Tradicional con Pan de Queso", tag: "Desayuno" },
        { id: 12, title: "Dulces Finos y Bocados Valacio's", tag: "Gourmet" },
      ],
    },
    contato: {
      badge: "CONTÁCTANOS",
      title: "Lleva Valacio's a Tu Hogar o Tu Negocio",
      description: "¿Deseas garantizar nuestros panes de queso y waffles artesanales en el congelador de casa o comercializar delicias de primera en tu tienda, cafetería o supermercado? Atendemos pedidos mayoristas y minoristas. ¡Escríbenos para ser nuestro aliado!",
      namePlaceholder: "Nombre completo",
      emailPlaceholder: "Correo electrónico",
      msgPlaceholder: "Escribe tu mensaje o consulta",
      whatsappBtn: "Enviar Mensaje",
      submitBtn: "ENVIAR MENSAJE",
      sending: "ENVIANDO...",
      successTitle: "¡Mensaje recibido!",
      successMsg: "¡Gracias! Tu mensaje ha sido enviado con éxito y te responderemos en breve.",
      distributedBy: "DISTRIBUIDO POR",
      companyName: "Valacio's Sweets Party & Bites, LLC",
      companyCity: "Joliet, IL 60435",
    },
    sobrePage: {
      badge: "NUESTRA HISTORIA",
      subtitle: "Valacio's Sweets & Bites",
      title: "Amor, Tradición y Sabor Auténtico",
      intro: "Más que recetas, compartimos afecto y recuerdos a través de un sabor legítimo.",
      creatorP1: "Valacio's Sweets & Bites nació de las manos de Lea Valacio, reuniendo décadas de pasión por la auténtica cocina de Minas Gerais y el cariño de la repostería artesanal.",
      quote: "Cocinar es nuestra manera más pura de expresar afecto, honrar tradiciones y reunir a los seres queridos alrededor de la mesa.",
      creatorP2: "Cada receta se elabora artesanalmente con quesos nobles de alta calidad, garantizando esa corteza crujiente por fuera y una esponjosidad inigualable por dentro.",
      sinceText: "Desde el principio",
      sinceSub: "Manteniendo viva la tradición artesanal",
      pillarsHeading: "Nuestros Pilares",
      pillars: [
        {
          pilar: "Sabor",
          description: "Ingredientes nobles y frescos seleccionados para brindar una experiencia gastronómica inigualable.",
        },
        {
          pilar: "Creatividad",
          description: "Productos innovadores y exclusivos pensados con dedicación para cada cliente.",
        },
        {
          pilar: "Dedicación",
          description: "Amor por el oficio y atención minuciosa a cada detalle de la preparación.",
        },
        {
          pilar: "Excelencia",
          description: "Compromiso absoluto con la calidad superior y la satisfacción de quien lo degusta.",
        },
      ],
      btnProducts: "Conocer Nuestros Productos",
      btnBack: "Volver al Inicio",
    },
    produtosPage: {
      heroBadge: "LÍNEA ARTESANAL",
      heroTitle: "Nuestros Productos",
      heroSubtitle: "Hecho con amor, tradición y verdadero queso en cada receta",
      backToHome: "Volver al inicio",
      serving100g: "CANT. POR 100g",
      serving50g: "CANT. POR 50g",
      vdHeader: "%VD(*)",
      nutritionalInfo: "INFORMACIÓN NUTRICIONAL",
      component: "COMPONENTE",
      energy: "VALOR ENERGÉTICO",
      carbs: "CARBOHIDRATOS",
      sugars: "AZÚCARES TOTALES",
      addedSugars: "AZÚCARES AÑADIDOS",
      proteins: "PROTEÍNAS",
      totalFat: "GRASAS TOTALES",
      saturatedFat: "GRASAS SATURADAS",
      transFat: "GRASAS TRANS",
      fiber: "FIBRA DIETÉTICA",
      sodium: "SODIO",
      tableFootnote: "* % Valores Diarios de referencia basados en una dieta de 2.000 kcal o 8.400 kJ. Sus valores diarios pueden ser mayores o menores según sus necesidades energéticas. ** VD no establecido.",
      ingredientsLabel: "Ingredientes:",
      allergensLabel: "ALÉRGICOS:",
      requestPriceBtn: "SOLICITAR LISTA DE PRECIOS / PEDIDO",
      viewOfficialLabel: "Ver Etiqueta Oficial",
      tableMode: "Tabla",
      labelMode: "Etiqueta Oficial",
      clickToZoom: "Clic para ampliar la etiqueta",
      closeModal: "Cerrar",
      prevImage: "Imagen anterior",
      nextImage: "Siguiente imagen",
      viewPackage: "Ver empaque",
      viewLabel: "Ver etiqueta",
      viewTable: "Ver tabla",
      prepWaffle: "5 min en tostadora u horno",
      prepCheeseBread: "20 min al horno",
      whatsappInquiry: "¡Hola! Me gustaría solicitar la lista de precios y hacer un pedido de {product} de Valacio's Sweets & Bites.",
      catalog: {
        tradicional: {
          name: "Pan de Queso Tradicional",
          subname: "Pan de queso",
          badgeLabel: "TRADICIONAL",
          description: "El auténtico pan de queso artesanal, elaborado con queso de verdad, crujiente por fuera e increíblemente suave por dentro.",
          ingredients: "Almidón de yuca dulce y agrio especial, queso artesanal semicurado, leche entera, huevos y aceite vegetal. NO CONTIENE GLUTEN.",
          allergens: "ALÉRGICOS: CONTIENE DERIVADOS DE LECHE Y HUEVOS. CONTIENE LACTOSA.",
        },
        goiabada: {
          name: "Pan de Queso con Guayaba",
          subname: "Pan de queso relleno",
          badgeLabel: "PAN DE QUESO CON GUAYABA",
          description: "La unión perfecta del sabor del queso con la dulzura de la guayaba cremosa. Un clásico Romeo y Julieta inolvidable.",
          ingredients: "Almidón de yuca especial, queso artesanal, pasta de guayaba cremosa, leche, huevos y aceite vegetal. NO CONTIENE GLUTEN.",
          allergens: "ALÉRGICOS: CONTIENE DERIVADOS DE LECHE Y HUEVOS. CONTIENE LACTOSA.",
        },
        jalapeno: {
          name: "Pan de Queso Jalapeño",
          subname: "Pan de queso sazonado",
          badgeLabel: "PAN DE QUESO JALAPEÑO",
          description: "Para los amantes del sabor intenso: el equilibrio perfecto entre la cremosidad del queso y el toque picante y aromático del jalapeño.",
          ingredients: "Almidón de yuca especial, queso artesanal, copos de chile jalapeño seleccionado, leche entera, huevos y aceite vegetal. NO CONTIENE GLUTEN.",
          allergens: "ALÉRGICOS: CONTIENE DERIVADOS DE LECHE Y HUEVOS. CONTIENE LACTOSA.",
        },
        waffle: {
          name: "Waffle de Pan de Queso",
          subname: "Waffle artesanal",
          badgeLabel: "WAFFLE DE PAN DE QUESO",
          description: "Innovación y crocancia incomparable: el sabor único del pan de queso en el práctico formato de waffle. ¡Directo del congelador a la tostadora, horno o air fryer!",
          ingredients: "Almidón de yuca dulce y agrio especial, queso artesanal semicurado, leche entera, huevos y aceite vegetal. NO CONTIENE GLUTEN.",
          allergens: "ALÉRGICOS: CONTIENE DERIVADOS DE LECHE Y HUEVOS. CONTIENE LACTOSA.",
        },
      },
    },
    modals: {
      close: "Cerrar",
      partnerTitle: "SÉ UN SOCIO",
      partnerSubtitle: "Lleva el legítimo pan de queso brasileño y productos artesanales exclusivos a tu negocio.",
      partnerCall: "¿Eres dueño de una cafetería, tienda gourmet, panadería, hotel, supermercado o una tienda y te gustaría tener nuestros productos?",
      nameEmpresaPlaceholder: "Nombre del responsable y de la empresa",
      whatsappPlaceholder: "(###) ###-####",
      cityStatePlaceholder: "Ciudad / Estado",
      partnerBtn: "QUIERO SER UN SOCIO REVENDEDOR",
      partnerGreeting: "¡Hola! Tengo interés en ser un socio revendedor de Valacio's.",
      successTitle: "¡Solicitud Recibida con Éxito!",
      successMsg: "Tu solicitud ha sido guardada con éxito en el sistema. ¡Nos pondremos en contacto muy pronto!",
      whereToFindTitle: "DÓNDE ENCONTRAR",
      whereToFindSubtitle: "Puntos de venta y socios oficiales",
      whereToFindText: "Encuentra los productos Valacio's en los siguientes establecimentos socios:",
      whereToFindWhatsAppBtn: "Consultar en WhatsApp",
      wantInMyStoreBtn: "¡Quiero tener los productos en mi tienda!",
      locations: [
        {
          title: "International Fresh Market",
          desc: "en Naperville, Illinois.",
        },
        {
          title: "El Guero",
          desc: "in Crest Hill, Illinois.",
        },
        {
          title: "Garden Fresh Market",
          desc: "in Mundelein, IL.",
        },
      ],
      franchiseTitle: "SÉ UN FRANQUICIADO",
      franchiseSubtitle: "Invierte en una marca consolidada con alto potencial de crecimiento",
      franchiseText: "Forma parte de nuestra red con formato de quiosco o tienda a la calle. Operación simplificada, productos de gran aceptación y acompañamiento integral en el lanzamiento.",
    },
    pwaModal: {
      title: "Cómo instalar en iPhone / iPad",
      desc: "Instala esta aplicación en tu dispositivo para un acceso rápido, sin conexión y con la mejor experiencia:",
      step1: "Toca el ícono de compartir en la barra inferior de Safari",
      step2: "Desplázate hacia abajo y selecciona 'Agregar a Inicio'",
      step3: "Toca 'Agregar' en la esquina superior derecha. ¡Listo!",
      close: "Cerrar",
    },
    footer: {
      sloganTitle: "El Verdadero Sabor de Minas en Tu Casa",
      sloganDesc: "Auténtico pan de queso artesanal, crujiente por fuera y suave por dentro. Elaborado con ingredientes nobles.",
      navigation: "Navegación",
      social: "Redes Sociales",
      distributedBy: "DISTRIBUIDO POR",
      rights: "Todos los derechos reservados.",
      madeWithLove: "Hecho con mucho queso y cariño artesanal",
      developedBy: "Desarrollado por",
    },
  },
};
