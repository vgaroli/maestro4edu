import { PrincipalService } from './../../services/principal.service';
import { GeekieService } from './../../services/geekie.service';
import { ChapterPerformace, ChapterPerformaceSummary } from './../../models/geekie.model';
import { Component, ViewChild, ViewChildren, QueryList, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-geekie-class-perf',
  templateUrl: './geekie-class-perf.component.html',
  styleUrls: ['./geekie-class-perf.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class GeekieClassPerfComponent implements OnInit {
  chapterSummary: ChapterPerformaceSummary[] = []
  constructor(private geekieService: GeekieService, private principal: PrincipalService, private cd: ChangeDetectorRef) { }

  @ViewChild('outerSort', { static: true }) sort: MatSort;
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<ChapterPerformace>>;

  dataSource: MatTableDataSource<ChapterPerformaceSummary>;
  columnsToDisplay = ['nome', 'recebidas', 'entregas'];
  innerDisplayedColumns = ['disciplina', 'capítulo', 'recebidas','entregas'];
  expandedElement: ChapterPerformaceSummary | null;

  loadData() {
    this.geekieService.listAllChapterPerformace().subscribe(lista => {
      let atualAluno = ""
      let resumo: ChapterPerformaceSummary[] =[]
      let index: number = -1
      let detalhe: ChapterPerformace[] = []
      for (let i = 0; i < Object.keys(lista).length; i++) {
        if (atualAluno !== lista[i].nomeAluno) {
          let itemResumo: ChapterPerformaceSummary = {
            idGeekie: lista[i].idGeekie,
            nomeAluno: lista[i].nomeAluno,
            recebidas: 0,
            quantidadeEntregas: 0,
          }
          if (index >= 0){
            resumo[index].detalhe = new MatTableDataSource(detalhe)
            detalhe=[]
          }
          resumo.push(itemResumo)
          index++
          atualAluno = lista[i].nomeAluno
        }
        resumo[index].recebidas += lista[i].recebidas
        resumo[index].quantidadeEntregas += lista[i].quantidadeEntregas
        detalhe.push(lista[i])
        
      }
      if (index >= 0){
        resumo[index].detalhe = new MatTableDataSource(detalhe)
        detalhe=[]
      }
      this.dataSource = new MatTableDataSource(resumo)
    })
  }

  toggleRow(element: ChapterPerformaceSummary) {
    element.detalhe && (element.detalhe as MatTableDataSource<ChapterPerformace>).data.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    this.cd.detectChanges();
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<ChapterPerformace>).sort = this.innerSort.toArray()[index]);
  }

  applyFilter(filterValue: string) {
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<ChapterPerformace>).filter = filterValue.trim().toLowerCase());
  }

  ngOnInit(): void {
    if (this.principal.tokensLoaded) {
      this.loadData()
    } else {
      this.principal.okTokens.subscribe(value => {
        if (value) {
          this.loadData()
        }
      })
    }
  }
}
