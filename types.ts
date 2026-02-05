// Representa uma foto dentro de um pack
export interface Photo {
  id: string;
  url: string;
  caption: string;
}

// Representa o criador do pack
export interface Creator {
  name: string;
  username: string;
  avatarUrl: string;
  verified: boolean;
}

// Representa um pack (ex: venda de packs de pés)
export interface Pack {
  id: string;           // identificador interno
  slug: string;         // usado na URL (ex: "maria", "joao")
  creator: Creator;     // quem criou/postou o pack
  title: string;        // nome exibido (ex: "Maria")
  description: string;  // descrição do pack
  price: number;        // preço em reais
  thumbnailUrl: string; // imagem de capa
  photos: Photo[];      // fotos inclusas no pack
  category: string;     // categoria (ex: "Pessoas")
  tags: string[];       // tags para busca
  likes: number;        // número de curtidas
  postedAt: string;     // data/hora de postagem
}

// Estado do usuário logado
export interface UserState {
  purchasedPackSlugs: string[]; // lista de slugs dos packs comprados
  balance: number;              // saldo do usuário
}

// Representa um usuário do sistema
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // opcional, não deve ser exposto no frontend
}
