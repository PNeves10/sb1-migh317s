import Link from 'next/link';
import { Brain, Twitter, Linkedin, Github, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold text-white">AIQuira</span>
            </div>
            <p className="text-sm text-slate-400">
              A principal plataforma para M&A digitais.<br/>
              A potenciar negócios com avaliações por IA e matchmaking inteligente.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Plataforma</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/marketplace" className="hover:text-white transition-colors">Marketplace</Link></li>
              <li><Link href="/valuation" className="hover:text-white transition-colors">Avaliação IA</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link href="/analytics" className="hover:text-white transition-colors">Analytics</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Recursos</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Preços</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Sobre</Link></li>
              <li><Link href="/help" className="hover:text-white transition-colors">Centro de Ajuda</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Mantenha-se Atualizado</h3>
            <p className="text-sm text-slate-400">
              Receba as últimas novidades sobre tendências de M&A digital e atualizações da plataforma.
            </p>
            <div className="flex space-x-2">
              <Input 
                placeholder="Insira o seu email" 
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
              />
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Subscrever
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-slate-400">
              © 2025 AIQuira. Todos os direitos reservados.
            </div>
            <div className="flex space-x-6 text-sm text-slate-400 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-white transition-colors">Política de Privacidade</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Termos de Serviço</Link>
              <Link href="/cookies" className="hover:text-white transition-colors">Política de Cookies</Link>
              <Link href="/gdpr" className="hover:text-white transition-colors">RGPD</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}