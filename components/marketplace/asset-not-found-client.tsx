'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export function AssetNotFoundClient() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="text-center py-8">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Ativo não encontrado</h2>
          <p className="text-slate-600 mb-4">O ativo que procura não existe ou foi removido.</p>
          <Button asChild>
            <Link href="/marketplace">Voltar ao Marketplace</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}