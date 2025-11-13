import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  vehicles: any[] = []; // lista de veículos para o select
  searchModel: string = '';
  selectedVehicle: any = null;
  vehicleData: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // 🔹 Carrega todos os veículos disponíveis na inicialização
    this.http.get<any[]>('http://localhost:3001/vehicle').subscribe({
      next: (data) => (this.vehicles = data),
      error: (err) => console.error('Erro ao carregar veículos:', err)
    });
  }

  selectVehicle(vehicle: any) {
    if (!vehicle.model) return;

    this.http.get<any[]>(`http://localhost:3001/vehicle?model=${vehicle.model}`).subscribe({
      next: (data) => {
        this.selectedVehicle = data[0] || null;

        if (this.selectedVehicle) {
          this.http
            .get<any[]>(`http://localhost:3001/vehicleData?code=${this.selectedVehicle.code}`)
            .subscribe((info) => (this.vehicleData = info[0]));
        }
      },
      error: (err) => console.error('Erro ao buscar veículo:', err)
    });
  }
}
