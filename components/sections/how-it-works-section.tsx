'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Search, MessageSquare, Handshake, TrendingUp, Shield } from 'lucide-react';

const steps = [
	{
		icon: UserPlus,
		title: 'Crie o Seu Perfil',
		description:
			'Registe-se e complete o seu perfil como comprador ou vendedor. Seja verificado para maior confiança e melhores correspondências.',
		color: 'text-blue-600 bg-blue-100',
		step: '01',
	},
	{
		icon: TrendingUp,
		title: 'Liste ou Pesquise Ativos',
		description:
			'Os vendedores listam os seus ativos digitais com avaliações por IA. Os compradores pesquisam e filtram de acordo com os seus critérios.',
		color: 'text-emerald-600 bg-emerald-100',
		step: '02',
	},
	{
		icon: Search,
		title: 'Receba Recomendações por IA',
		description:
			'O nosso algoritmo inteligente liga-o às oportunidades mais relevantes com base nas suas preferências.',
		color: 'text-indigo-600 bg-indigo-100',
		step: '03',
	},
	{
		icon: MessageSquare,
		title: 'Negocie & Due Diligence',
		description:
			'Utilize o nosso sistema de mensagens seguras para negociar termos e partilhar documentos de due diligence em segurança.',
		color: 'text-purple-600 bg-purple-100',
		step: '04',
	},
	{
		icon: Shield,
		title: 'Transação Segura',
		description:
			'Conclua o negócio com o nosso serviço de escrow que protege ambas as partes durante toda a transação.',
		color: 'text-amber-600 bg-amber-100',
		step: '05',
	},
	{
		icon: Handshake,
		title: 'Feche o Negócio',
		description:
			'Finalize a transação com toda a documentação legal e transferência de propriedade tratadas de forma simples.',
		color: 'text-red-600 bg-red-100',
		step: '06',
	},
];

export function HowItWorksSection() {
	return (
		<section className="py-24 bg-white">
			<div className="container mx-auto px-4">
				<div className="text-center mb-16">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
					>
						<Badge variant="outline" className="mb-4 px-4 py-2">
							Processo Simples
						</Badge>
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
							Como funciona a AIQuira
						</h2>
						<p className="text-xl text-slate-600 max-w-3xl mx-auto">
							O nosso processo simplificado torna o M&A digital acessível a todos.
							<br /> Desde o anúncio ao fecho, guiamos cada passo do processo.
						</p>
					</motion.div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{steps.map((step, index) => (
						<motion.div
							key={step.title}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							viewport={{ once: true }}
							className="relative"
						>
							<Card className="h-full card-hover border-slate-200 relative overflow-hidden">
								<div className="absolute top-4 right-4 text-6xl font-bold text-slate-100 select-none">
									{step.step}
								</div>
								<CardContent className="p-6 relative z-10">
									<div className={`p-4 rounded-xl ${step.color} w-fit mb-6`}>
										<step.icon className="w-8 h-8" />
									</div>
									<h3 className="text-xl font-semibold text-slate-900 mb-4">
										{step.title}
									</h3>
									<p className="text-slate-600 leading-relaxed">
										{step.description}
									</p>
								</CardContent>
							</Card>

							{/* Connection Line */}
							{index < steps.length - 1 && index % 3 !== 2 && (
								<div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-slate-300 to-transparent z-0" />
							)}
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}