import { inject, Injectable } from '@angular/core';
import { StorageService } from '../../storage/services/storage.service';
import { Observable, of, tap, throwError } from 'rxjs';
import { User } from '../models/User.model';
import * as CryptoJS from 'crypto-js';
import { SessionService } from './session.service';
import { Router } from '@angular/router';
import { Paciente } from '../../../features/admin/pacientes/models/Paciente.model';
import { Profissional } from '../../../features/admin/profissionais/models/Profissional.model';
import { Unidade } from '../../../features/admin/unidades/models/Unidade.model';
import { Consulta } from '../../../features/admin/consultas/models/Consulta.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private storage = inject(StorageService);
  private router = inject(Router);
  private sessionService = inject(SessionService);

  private readonly USERS_KEY = 'users';
  private readonly PACIENTES_KEY = 'pacientes';
  private readonly PROFISSIONAIS_KEY = 'profissionais';
  private readonly UNIDADES_KEY = 'unidades';
  private readonly CONSULTAS_KEY = 'consultas';

  constructor() {
    this.createMockProfissionais();
    this.createMockUsers();
    this.createMockUnidades();
    this.createMockPacientes();
    this.createMockConsultas();
  }

  login(email: string, password: string): Observable<User> {
    const users = this.storage.get<User[]>(this.USERS_KEY) || [];
    const passwordHash = this.hashPassword(password);

    const user = users.find(
      (u) => u.email === email && u.passwordHash === passwordHash,
    );

    if (!user) {
      return throwError(() => new Error('Credenciais inválidas'));
    }

    const redirectMap = {
      ADMIN: '/admin/pacientes',
      PROFESSIONAL: '/profissional/agenda',
      PATIENT: '/paciente/consultas',
    };

    return of(user).pipe(
      tap(() => {
        this.sessionService.setSession({
          userId: user.id,
          role: user.role,
          name: user.name,
          token: this.generateToken(user),
        });

        this.router.navigateByUrl(redirectMap[user.role]);
      }),
    );
  }

  logout(): void {
    this.sessionService.clearSession();
  }

  hashPassword(password: string): string {
    return CryptoJS.SHA256(password).toString();
  }

  generateToken(user: User): string {
    return btoa(
      JSON.stringify({
        sub: user.id,
        role: user.role,
        iat: Date.now(),
      }),
    );
  }

  private createMockUsers(): void {
    const mockUsers: User[] = [
      {
        id: 'u1',
        email: 'admin@vidaplus.com',
        passwordHash: this.hashPassword('admin123'),
        role: 'ADMIN',
        name: 'Administrador',
      },
      {
        id: 'u2',
        email: 'profissional@vidaplus.com',
        passwordHash: this.hashPassword('prof123'),
        role: 'PROFESSIONAL',
        name: 'Dr. João Silva',
      },
      {
        id: 'u3',
        email: 'paciente@vidaplus.com',
        passwordHash: this.hashPassword('paciente123'),
        role: 'PATIENT',
        name: 'Maria Oliveira',
      },
    ];

    this.storage.set(this.USERS_KEY, mockUsers);
  }

  private createMockUnidades() {
    const mockUnidades: Unidade[] = [
      {
        id: 1,
        nome: 'Unidade Central',
        telefone: '1133334444',
        endereço: 'Rua das Flores, 120 - Centro, São Paulo - SP',
        cep: '01001-000',
      },
      {
        id: 2,
        nome: 'Unidade Zona Norte',
        telefone: '1122223333',
        endereço:
          'Av. Engenheiro Caetano Álvares, 850 - Santana, São Paulo - SP',
        cep: '02546-000',
      },
      {
        id: 3,
        nome: 'Unidade Zona Sul',
        telefone: '1144445555',
        endereço: 'Av. Jabaquara, 2100 - Saúde, São Paulo - SP',
        cep: '04046-000',
      },
    ];

    this.storage.set(this.UNIDADES_KEY, mockUnidades);
  }

  private createMockProfissionais() {
    const mockProfissionais: Profissional[] = [
      {
        id: 1,
        userId: 1,
        nome: 'João Silva',
        crm: '123456',
        UFcrm: 'SP',
        celular: '11999999999',
        email: 'joao.silva@email.com',
        unidadeId: 1,
        especialidade: 'Cardiologia',
      },
      {
        id: 2,
        userId: 2,
        nome: 'Maria Oliveira',
        crm: '654321',
        UFcrm: 'RJ',
        celular: '21988887777',
        email: 'maria.oliveira@email.com',
        unidadeId: 1,
        especialidade: 'Pediatria',
      },
      {
        id: 3,
        userId: 3,
        nome: 'Carlos Santos',
        crm: '987654',
        UFcrm: 'MG',
        celular: '31977776666',
        email: 'carlos.santos@email.com',
        unidadeId: 2,
        especialidade: 'Ortopedia',
      },
    ];

    this.storage.set(this.PROFISSIONAIS_KEY, mockProfissionais);
  }

  private createMockPacientes() {
    const mockPacientes: Paciente[] = [
      {
        id: 1,
        userId: 'u1',
        nome: 'João da Silva',
        dataNascimento: '1990-04-15',
        idade: 34,
        cpf: '86074434026',
        email: 'joao@email.com',
        celular: '11999999999',
        tipoSanguineo: 'O+',
        peso: 72.5,
        altura: 1.78,
        alergias: 'Dipirona',
      },
      {
        id: 2,
        userId: 'u2',
        nome: 'Maria Oliveira',
        dataNascimento: '1985-10-03',
        idade: 39,
        cpf: '85094478028',
        email: 'maria@email.com',
        celular: '11988888888',
        tipoSanguineo: 'A-',
        peso: 65.2,
        altura: 1.65,
        alergias: '',
      },
      {
        id: 3,
        userId: 'u3',
        nome: 'Carlos Pereira',
        dataNascimento: '2001-01-22',
        idade: 24,
        cpf: '92776725019',
        email: 'carlos@email.com',
        celular: '11977777777',
        tipoSanguineo: 'B+',
        peso: 80.0,
        altura: 1.82,
        alergias: 'Lactose, glúten',
      },
    ];

    this.storage.set(this.PACIENTES_KEY, mockPacientes);
  }

  private createMockConsultas() {
    const mockConsultas: Consulta[] = [
      {
        id: 1,
        idPaciente: 1, // João da Silva
        idProfissional: 1, // João Silva (Cardiologia)
        especialidade: 'Cardiologia',
        unidadeId: 1, // Unidade Central
        dataHoraConsulta: '2026-03-20T09:00:00',
      },
      {
        id: 2,
        idPaciente: 2, // Maria Oliveira
        idProfissional: 2, // Maria Oliveira (Pediatria)
        especialidade: 'Pediatria',
        unidadeId: 1,
        dataHoraConsulta: '2026-03-21T14:30:00',
      },
      {
        id: 3,
        idPaciente: 3, // Carlos Pereira
        idProfissional: 3, // Carlos Santos (Ortopedia)
        especialidade: 'Ortopedia',
        unidadeId: 2, // Unidade Zona Norte
        dataHoraConsulta: '2026-03-22T16:00:00',
      },
      {
        id: 4,
        idPaciente: 1,
        idProfissional: 3,
        especialidade: 'Ortopedia',
        unidadeId: 2,
        dataHoraConsulta: '2026-03-25T10:15:00',
      },
    ];

    this.storage.set(this.CONSULTAS_KEY, mockConsultas);
  }
}
