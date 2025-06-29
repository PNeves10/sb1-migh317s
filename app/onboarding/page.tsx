'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/auth-context';
import { Brain, ShoppingCart, TrendingUp, Calculator, Users, Shield, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const onboardingSteps = [
	{
		id: 1,
		title: 'Bem-vindo à AIQuira',
		description: 'Vamos começar na principal plataforma digital de M&A',
	},
	{
		id: 2,
		title: 'Escolha o Seu Papel',
		description: 'Procura comprar ou vender ativos digitais?',
	},
	{
		id: 3,
		title: 'Funcionalidades da Plataforma',
		description: 'Descubra o que torna a AIQuira a melhor escolha para M&A digital',
	},
	{
		id: 4,
		title: 'Pronto para Começar',
		description: 'A sua conta está criada e pronta a usar!',
	},
];

const features = [
	{
		icon: Calculator,
		title: 'Avaliação com IA',
		description:
			'Obtenha avaliações instantâneas e precisas de ativos usando algoritmos de machine learning treinados em milhares de negócios bem-sucedidos.',
	},
	{
		icon: Users,
		title: 'Matchmaking Inteligente',
		description:
			'A nossa IA liga os compradores certos aos vendedores com base em preferências, orçamento e tipo de ativo.',
	},
	{
		icon: Shield,
		title: 'Transações Seguras',
		description:
			'Todos os negócios são protegidos com serviços de escrow, sistemas de verificação e documentação legal.',
	},
];

export default function OnboardingPage() {
	const [currentStep, setCurrentStep] = useState(1);
	const [selectedRole, setSelectedRole] = useState<'buyer' | 'seller'>('buyer');
	const { user } = useAuth();
	const router = useRouter();

	const progress = (currentStep / onboardingSteps.length) * 100;

	const handleNext = () => {
		if (currentStep < onboardingSteps.length) {
			setCurrentStep(currentStep + 1);
		}
	};

	const handlePrevious = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		}
	};

	const handleFinish = () => {
		toast('Bem-vindo à AIQuira! O seu onboarding está concluído. Vamos explorar o seu painel.', {
			description: undefined,
		});
		router.push('/dashboard');
	};

	const renderStepContent = () => {
		switch (currentStep) {
			case 1:
				return (
					<div className="text-center space-y-6">
						<div className="flex justify-center">
							<Brain className="h-24 w-24 text-blue-600" />
						</div>
						<div>
							<h2 className="text-3xl font-bold text-slate-900 mb-4">Bem-vindo à AIQuira</h2>
							<p className="text-lg text-slate-600 max-w-2xl mx-auto">
								A plataforma mais avançada do mundo para fusões e aquisições digitais. Usamos IA para tornar a compra e venda de ativos digitais simples, segura e rentável.
							</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
							<div className="text-center p-4">
								<div className="text-2xl font-bold text-blue-600">2.847</div>
								<div className="text-slate-600">Listagens Ativas</div>
							</div>
							<div className="text-center p-4">
								<div className="text-2xl font-bold text-green-600">47M€</div>
								<div className="text-slate-600">Volume Total</div>
							</div>
							<div className="text-center p-4">
								<div className="text-2xl font-bold text-purple-600">1.293</div>
								<div className="text-slate-600">Negócios Concluídos</div>
							</div>
						</div>
					</div>
				);

			case 2:
				return (
					<div className="space-y-6">
						<div className="text-center">
							<h2 className="text-3xl font-bold text-slate-900 mb-4">O que o traz à AIQuira?</h2>
							<p className="text-lg text-slate-600">Escolha o seu papel principal para personalizar a sua experiência</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<Card
								className={`cursor-pointer transition-all duration-200 ${
									selectedRole === 'buyer' ? 'ring-2 ring-blue-600 bg-blue-50' : 'hover:shadow-lg'
								}`}

								onClick={() => setSelectedRole('buyer')}
							>
								<CardHeader className="text-center">
									<ShoppingCart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
									<CardTitle className="text-xl">Sou Comprador</CardTitle>
								</CardHeader>
								<CardContent>
									<ul className="space-y-2 text-sm text-slate-600">
										<li>• Explore ativos digitais verificados</li>
										<li>• Receba recomendações com IA</li>
										<li>• Aceda a análises detalhadas dos ativos</li>
										<li>• Conecte-se com vendedores verificados</li>
									</ul>
								</CardContent>
							</Card>

							<Card
								className={`cursor-pointer transition-all duration-200 ${
									selectedRole === 'seller' ? 'ring-2 ring-green-600 bg-green-50' : 'hover:shadow-lg'
								}`}

								onClick={() => setSelectedRole('seller')}
							>
								<CardHeader className="text-center">
									<TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
									<CardTitle className="text-xl">Sou Vendedor</CardTitle>
								</CardHeader>
								<CardContent>
									<ul className="space-y-2 text-sm text-slate-600">
										<li>• Liste os seus ativos digitais</li>
										<li>• Obtenha estimativas de avaliação com IA</li>
										<li>• Alcance compradores qualificados</li>
										<li>• Gere várias listagens</li>
									</ul>
								</CardContent>
							</Card>
						</div>
					</div>
				);

			case 3:
				return (
					<div className="space-y-6">
						<div className="text-center">
							<h2 className="text-3xl font-bold text-slate-900 mb-4">Porquê escolher a AIQuira?</h2>
							<p className="text-lg text-slate-600">Construímos as ferramentas mais avançadas para transações de ativos digitais</p>
						</div>

						<div className="space-y-6">
							{features.map((feature, index) => {
								const IconComponent = feature.icon;

								return (
									<div key={index} className="flex items-start space-x-4 p-4 bg-slate-50 rounded-lg">
										<div className="bg-blue-600 text-white rounded-full p-2 flex-shrink-0">
											<IconComponent className="h-6 w-6" />
										</div>
										<div>
											<h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
											<p className="text-slate-600">{feature.description}</p>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				);

			case 4:
				return (
					<div className="text-center space-y-6">
						<div className="flex justify-center">
							<CheckCircle className="h-24 w-24 text-green-600" />
						</div>
						<div>
							<h2 className="text-3xl font-bold text-slate-900 mb-4">Tudo pronto!</h2>
							<p className="text-lg text-slate-600 max-w-2xl mx-auto">
								Bem-vindo à AIQuira, {user?.name}! A sua conta está pronta e pode agora começar
								{selectedRole === 'buyer' ? ' a explorar ativos digitais' : ' a listar os seus ativos'}.
							</p>
						</div>

						<div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-6 rounded-lg">
							<h3 className="text-xl font-semibold mb-2">🎉 Oferta Especial de Boas-Vindas</h3>
							<p className="text-blue-100">Obtenha 50% de desconto na sua primeira taxa de transação como novo membro!</p>
							<Badge className="mt-2 bg-yellow-400 text-yellow-900">Use o código: WELCOME50</Badge>
						</div>
					</div>
				);

			default:
				return null;
		}
	};

	return (
		<div className="min-h-screen bg-slate-50 py-8">
			<div className="container mx-auto px-4">
				{/* Barra de progresso */}
				<div className="mb-8">
					<div className="flex justify-between items-center mb-2">
						<span className="text-sm text-slate-600">
							Passo {currentStep} de {onboardingSteps.length}
						</span>
						<span className="text-sm text-slate-600">{Math.round(progress)}% concluído</span>
					</div>
					<Progress value={progress} className="h-2" />
				</div>

				{/* Conteúdo do passo */}
				<Card className="mb-8">
					<CardContent className="p-8">{renderStepContent()}</CardContent>
				</Card>

				{/* Navegação */}
				<div className="flex justify-between">
					<Button onClick={handlePrevious} variant="outline" disabled={currentStep === 1}>
						<ArrowLeft className="h-4 w-4 mr-2" />
						Anterior
					</Button>

					{currentStep < onboardingSteps.length ? (
						<Button onClick={handleNext}>
							Seguinte
							<ArrowRight className="h-4 w-4 ml-2" />
						</Button>
					) : (
						<Button onClick={handleFinish} className="bg-green-600 hover:bg-green-700">
							Começar
							<CheckCircle className="h-4 w-4 ml-2" />
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}