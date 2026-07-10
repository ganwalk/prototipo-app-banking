export const user = {
  firstName: 'Armando',
  fullName: 'Armando Neves',
  initials: 'AN',
}

export interface CarouselSlide {
  id: string
  eyebrow: string
  title: string
  amountLabel: string
  amount: number
  secondaryLines?: { label: string; amount: number }[]
  progress?: { used: number; total: number }
  cta: string
  badge?: string
}

export const carouselSlides: CarouselSlide[] = [
  {
    id: 'conta',
    eyebrow: 'Conta corrente',
    title: 'Conta corrente',
    amountLabel: 'Saldo atual',
    amount: 18432.67,
    secondaryLines: [
      { label: 'Saldo + limite', amount: 24432.67 },
      { label: 'Saldo Open Finance', amount: 3218.4 },
    ],
    cta: 'Ir para extrato',
  },
  {
    id: 'cartao',
    eyebrow: 'Cartão de crédito',
    title: 'Cartão de crédito',
    amountLabel: 'Fatura Cartão Black crédito e débito final 3416',
    amount: 4218.9,
    progress: { used: 4218.9, total: 12000 },
    cta: 'Ir para cartões',
  },
  {
    id: 'investimentos',
    eyebrow: 'Investimentos',
    title: 'Investimentos',
    amountLabel: 'Patrimônio total',
    amount: 96540.12,
    secondaryLines: [{ label: 'Rentabilidade no mês', amount: 812.35 }],
    cta: 'Ir para investimentos',
  },
  {
    id: 'emprestimos',
    eyebrow: 'Empréstimos e consórcio',
    title: 'Empréstimos e consórcio',
    amountLabel: 'Próxima parcela',
    amount: 640.0,
    cta: 'Simular agora',
  },
  {
    id: 'seguros',
    eyebrow: 'Seguros',
    title: 'Seguros',
    amountLabel: 'Proteção contratada',
    amount: 0,
    cta: 'Contratar seguro',
    badge: 'Novidade',
  },
]

export interface PromoSlide {
  id: string
  title: string
  cta: string
  icon: 'pix' | 'heart' | 'sparkles'
}

export const promoSlides: PromoSlide[] = [
  {
    id: 'pix-automatico',
    title: 'Organize seus pagamentos com Pix Automático.',
    cta: 'Saber mais',
    icon: 'pix',
  },
  {
    id: 'seguro-vida',
    title: 'Essencial para seu presente, indispensável para seu futuro.',
    cta: 'Veja mais',
    icon: 'heart',
  },
  {
    id: 'auvp-plus',
    title: 'Assessoria dedicada para fazer seu patrimônio crescer.',
    cta: 'Conhecer',
    icon: 'sparkles',
  },
]

export interface Transaction {
  id: string
  title: string
  subtitle: string
  amount: number
  direction: 'in' | 'out'
}

export const transactions: Transaction[] = [
  {
    id: 't1',
    title: 'Pix recebido · Camila Souza',
    subtitle: '19:42',
    amount: 1250.0,
    direction: 'in',
  },
  {
    id: 't2',
    title: 'Academia Corpo & Cia',
    subtitle: 'Débito automático · 08:03',
    amount: 218.07,
    direction: 'out',
  },
  {
    id: 't3',
    title: 'Transferência · Cartão Black',
    subtitle: 'Pagamento de fatura · 07:15',
    amount: 980.0,
    direction: 'out',
  },
]

export interface MenuSection {
  id: string
  title: string
  amountLabel?: string
  amount?: number
  helper?: string
  badge?: string
}

export const menuSections: MenuSection[] = [
  { id: 'conta', title: 'Conta', amountLabel: 'Saldo disponível', amount: 18432.67 },
  { id: 'cartao', title: 'Cartão', amountLabel: 'Fatura atual', amount: 4218.9 },
  { id: 'emprestimos', title: 'Empréstimos e consórcio' },
  { id: 'investimentos', title: 'Investimentos', amountLabel: 'Patrimônio', amount: 96540.12 },
  {
    id: 'internacional',
    title: 'Contas Internacionais',
    helper: 'Cartão e investimentos em moeda estrangeira',
    badge: 'Novidade',
  },
  { id: 'seguros', title: 'Seguros', helper: 'Proteja o que importa' },
]
