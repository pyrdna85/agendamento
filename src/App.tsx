import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginForm } from "./components/auth/LoginForm";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import NovoAgendamento from "./pages/NovoAgendamento";
import Agendamentos from "./pages/Agendamentos";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProfessores from "./pages/admin/AdminProfessores";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<{ email: string; role: 'admin' | 'user' } | null>(null);

  const handleLogin = (email: string, password: string, role: 'admin' | 'user') => {
    // Em produção, aqui seria feita a autenticação real
    setUser({ email, role });
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <LoginForm onLogin={handleLogin} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppLayout userRole={user.role} onLogout={handleLogout}>
            <Routes>
              {user.role === 'admin' ? (
                <>
                  <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/professores" element={<AdminProfessores />} />
                  <Route path="/admin/materias" element={<div>Materias em desenvolvimento</div>} />
                  <Route path="/admin/salas" element={<div>Salas em desenvolvimento</div>} />
                  <Route path="/admin/equipamentos" element={<div>Equipamentos em desenvolvimento</div>} />
                  <Route path="/admin/agendamentos" element={<div>Agendamentos Admin em desenvolvimento</div>} />
                </>
              ) : (
                <>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/novo-agendamento" element={<NovoAgendamento />} />
                  <Route path="/agendamentos" element={<Agendamentos />} />
                </>
              )}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
