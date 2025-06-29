'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, Quote } from 'lucide-react';

const testimonials = [
	{
		name: 'Sofia Rodrigues',
		role: 'Fundadora de SaaS',
		company: 'TechFlow Solutions',
		avatar:
			'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150',
		content:
			'A avaliação da AIQuira foi precisa e ajudou-me a vender o meu SaaS por mais 40% do que esperava inicialmente. O processo foi simples e o emparelhamento com compradores foi incrível.',
		rating: 5,
		deal: 'Vendido por 2,3M€',
	},
	{
		name: 'Carlos Mendes',
		role: 'Investidor Digital',
		company: 'Venture Digital Partners',
		avatar:
			'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
		content:
			'Já usei outras plataformas, mas as recomendações de IA da AIQuira são incomparáveis. Encontrei 3 aquisições lucrativas no meu primeiro mês na plataforma.',
		rating: 5,
		deal: 'Adquiriu 3 ativos',
	},
	{
		name: 'Ana Silva',
		role: 'Proprietária de E-commerce',
		company: 'StyleCraft Boutique',
		avatar:
			'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
		content:
			'O processo de due diligence foi rigoroso mas simples. A AIQuira fez com que vender o meu negócio de e-commerce fosse seguro e profissional do início ao fim.',
		rating: 5,
		deal: 'Vendido por 850.000€',
	},
	{
		name: 'Pedro Costa',
		role: 'Empreendedor em Série',
		company: 'Growth Ventures',
		avatar:
			'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
		content:
			'Os insights e análises de mercado ajudaram-me a definir o preço perfeito para os meus ativos digitais. Vendi 2 websites em 30 dias após o anúncio.',
		rating: 5,
		deal: 'Saída de portefólio',
	},
	{
		name: 'Maria Fernandes',
		role: 'Desenvolvedora de Apps',
		company: 'MobileFirst Studios',
		avatar:
			'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=150',
		content:
			'A AIQuira ligou-me ao comprador ideal para a minha app móvel. As ferramentas de comunicação e o serviço de escrow tornaram tudo muito simples.',
		rating: 5,
		deal: 'Vendido por 1,2M€',
	},
	{
		name: 'João Santos',
		role: 'Gestor de Investimentos',
		company: 'Digital Asset Fund',
		avatar:
			'https://images.pexels.com/photos/2897883/pexels-photo-2897883.jpeg?auto=compress&cs=tinysrgb&w=150',
		content:
			'Como comprador profissional, valorizo as análises detalhadas e os processos de verificação. Negócios de qualidade e informação transparente.',
		rating: 5,
		deal: 'Mais de 10M€ investidos',
	},
];

export function TestimonialsSection() {
	return (
		<section className="py-24 bg-gradient-to-b from-slate-50 to-white">
			<div className="container mx-auto px-4">
				<div className="text-center mb-16">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
					>
						<Badge variant="outline" className="mb-4 px-4 py-2">
							<Star className="w-4 h-4 mr-2 fill-amber-400 text-amber-400" />
							Histórias de Clientes
						</Badge>
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
							De confiança para milhares de
							<span className="block text-gradient">
								empreendedores digitais
							</span>
						</h2>
						<p className="text-xl text-slate-600 max-w-3xl mx-auto">
							Junte-se a compradores e vendedores de sucesso que já realizaram
							mais de 2,4 mil milhões de euros em transações na nossa plataforma.
						</p>
					</motion.div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{testimonials.map((testimonial, index) => (
						<motion.div
							key={testimonial.name}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							viewport={{ once: true }}
						>
							<Card className="h-full card-hover border-slate-200 relative">
								<CardContent className="p-6">
									<Quote className="w-8 h-8 text-blue-200 mb-4" />

									<div className="flex items-center mb-4">
										{[...Array(testimonial.rating)].map((_, i) => (
											<Star
												key={i}
												className="w-4 h-4 fill-amber-400 text-amber-400"
											/>
										))}
									</div>

									<p className="text-slate-600 mb-6 leading-relaxed">
										"{testimonial.content}"
									</p>

									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-3">
											<Avatar className="w-10 h-10">
												<AvatarImage
													src={testimonial.avatar}
													alt={testimonial.name}
												/>
												<AvatarFallback>
													{testimonial.name.charAt(0)}
												</AvatarFallback>
											</Avatar>
											<div>
												<div className="font-semibold text-slate-900">
													{testimonial.name}
												</div>
												<div className="text-sm text-slate-500">
													{testimonial.role}
												</div>
											</div>
										</div>
										<Badge variant="secondary" className="text-xs">
											{testimonial.deal}
										</Badge>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}