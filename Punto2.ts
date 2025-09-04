
abstract class FiguraGeometrica {
  protected nombre: string;

  constructor(nombre: string) {
    this.nombre = nombre;
  }

  abstract calcularArea(): number;

  getNombre(): string {
    return this.nombre;
  }
}
class Cuadrado extends FiguraGeometrica {
  private lado: number;

  constructor(lado: number) {
    super("Cuadrado");
    this.lado = lado;
  }

  calcularArea(): number {
    return this.lado * this.lado;
  }
}
class Triangulo extends FiguraGeometrica {
  private base: number;
  private altura: number;

  constructor(base: number, altura: number) {
    super("Triangulo");
    this.base = base;
    this.altura = altura;
  }

  calcularArea(): number {
    return (this.base * this.altura) / 2;
  }
}
class Circulo extends FiguraGeometrica {
  private radio: number;

  constructor(radio: number) {
    super("cIrculo");
    this.radio = radio;
  }

  calcularArea(): number {
    return Math.PI * this.radio ** 2;
  }
  
}
