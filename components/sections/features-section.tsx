'use client';

import { Brain, TrendingUp, Users, Shield, Zap, MessageSquare, Search, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const features = [
	{
		icon: Brain,
		title: 'Avaliações Potenciadas por IA',
		description:
			'Obtenha avaliações instantâneas e precisas com o nosso algoritmo proprietário de IA que analisa receitas, tráfego e tendências de mercado.',
		badge: 'Funcionalidade Principal',
		color: 'text-blue-600 bg-blue-100',
	},
	{
		icon: Search,
		title: 'Emparelhamento Inteligente',
		description:
			'A nossa IA conecta os compradores certos com vendedores com base em preferências, orçamento e compatibilidade de ativos.',
		badge: 'Popular',
		color: 'text-emerald-600 bg-emerald-100',
	},
	{
		icon: TrendingUp,
		title: 'Análise de Mercado',
		description:
			'Aceda a dados de mercado abrangentes, tendências e benchmarks para tomar decisões de investimento informadas.',
		badge: 'Pro',
		color: 'text-indigo-600 bg-indigo-100',
	},
	{
		icon: Shield,
		title: 'Serviço de Escrow Seguro',
		description:
			'Transacções protegidas com serviço de escrow integrado e deteção de fraude para maior tranquilidade.',
		badge: 'Segurança',
		color: 'text-red-600 bg-red-100',
	},
	{
		icon: MessageSquare,
		title: 'Mensagens Diretas',
		description:
			'Sistema de comunicação integrado para negociar negócios e partilhar documentos de due diligence em segurança.',
		badge: 'Comunicação',
		color: 'text-purple-600 bg-purple-100',
	},
	{
		icon: FileText,
		title: 'Relatórios de Due Diligence',
		description:
			'Geração automática de relatórios de due diligence completos com análise financeira e técnica.',
		badge: 'Automatização',
		color: 'text-amber-600 bg-amber-100',
	},
];

export function FeaturesSection() {
	return (
		<section className="py-24 bg-gradient-to-b from-white to-slate-50">
			<div className="container mx-auto px-4">
				<div className="text-center mb-16">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
					>
						<Badge variant="outline" className="mb-4 px-4 py-2">
							<Zap className="w-4 h-4 mr-2" />
							Funcionalidades da Plataforma
						</Badge>
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
							Tudo o que precisa para
							<span className="block text-gradient">M&A digital de sucesso</span>
						</h2>
						<p className="text-xl text-slate-600 max-w-3xl mx-auto">
							A nossa plataforma completa combina inteligência artificial com processos comprovados de M&A
							para proporcionar a melhor experiência tanto a compradores como a vendedores.
						</p>
					</motion.div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{features.map((feature, index) => (
						<motion.div
							key={feature.title}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							viewport={{ once: true }}
						>
							<Card className="h-full card-hover border-slate-200 bg-white/70 backdrop-blur-sm">
								<CardHeader>
									<div className="flex items-center justify-between mb-4">
										<div className={`p-3 rounded-xl ${feature.color}`}>
											<feature.icon className="w-6 h-6" />
										</div>
										<Badge variant="secondary" className="text-xs">
											{feature.badge}
										</Badge>
									</div>
									<CardTitle className="text-xl">{feature.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<CardDescription className="text-slate-600 leading-relaxed">
										{feature.description}
									</CardDescription>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}