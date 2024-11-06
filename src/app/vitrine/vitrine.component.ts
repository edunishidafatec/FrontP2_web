import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../model/produto';
import { Item } from '../model/item';
import { Cesta } from '../model/cesta';
@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vitrine.component.html',
  styleUrl: './vitrine.component.css'
})
export class VitrineComponent {
  public mensagem: string = "conheça as nossas promoções";
  public lista: Produto[] = [
    {codigo:1, nome:"Pamonha", descritivo:"Pamonha original de milho",
      valor:30.00, quantidade:10, keywords:"alimentos com milho"},
    {codigo:2, nome:"Bolo de milho", descritivo:"Bolo feito com milho",
    valor:40.00, quantidade:10, keywords:"alimentos com milho"},
    {codigo:3, nome:"Copo - Suco de milho", descritivo:"copo 200 ml de milho",
    valor:50.00, quantidade:10, keywords:"alimentos com milho"},
    {codigo:4, nome:"Garrafa - Suco de milho", descritivo:"garrafa de 500 ml de milho",
    valor:60.00, quantidade:0, keywords:"alimentos com milho"},
    {codigo:5, nome:"Caixa - Suco de milho", descritivo:"suco em caixinha de milho",
    valor:50.00, quantidade:10, keywords:"alimentos com milho"},
    {codigo:3, nome:"Canjica de milho", descritivo:"Canjica feito a base de milho",
    valor:50.00, quantidade:10, keywords:"alimentos com milho"}
  ];

  public verDetalhe(item:Produto){
    localStorage.setItem("produto", JSON.stringify(item));
    window.location.href = "./detalhe";  
  }

  public adicionarItem(obj:Produto){
      let json = localStorage.getItem("cesta");
      let jsonCliente = localStorage.getItem("cliente");
      let cesta: Cesta = new Cesta();
      let item: Item = new Item();
      if(json==null){      //CESTA NAO EXISTE     
          item.codigo=obj.codigo;
          item.produto=obj;
          item.quantidade=1;
          item.valor= obj.valor;          
          cesta.codigo = 1;
          cesta.total = obj.valor;
          cesta.itens.push(item);          
          if(jsonCliente!=null) cesta.cliente = JSON.parse(jsonCliente);          
      } else {  //CESTA EXISTE
        let achou = false;
        cesta = JSON.parse(json);
        for(let i=0; i<cesta.itens.length; i++){
          if(cesta.itens[i].codigo==obj.codigo){  //ITEM JA EXISTE
            cesta.itens[i].quantidade = cesta.itens[i].quantidade + 1;
            cesta.itens[i].valor =  cesta.itens[i].quantidade * cesta.itens[i].produto.valor;
            achou = true;
            break;
          }            
        }
        if(!achou){  //ITEM NAO EXISTE
          item.codigo=obj.codigo;
          item.produto=obj;
          item.quantidade=1;
          item.valor= obj.valor;    
          cesta.itens.push(item);      
        }
      }

      cesta.total = 0; //ATUALIZA O VALOR TOTAL DA CESTA
      for(let i=0; i<cesta.itens.length; i++){
        cesta.total= cesta.itens[i].valor + cesta.total;
      }

      localStorage.setItem("cesta", JSON.stringify(cesta));
      window.location.href = "./cesta";
  }

}
