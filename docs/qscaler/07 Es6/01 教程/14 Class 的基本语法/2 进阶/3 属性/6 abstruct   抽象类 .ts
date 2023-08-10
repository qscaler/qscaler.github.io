// 抽象类      只能在ts 使用
abstract class Geom {
    width: number;
    getType() {
        return "Gemo";
    }
    abstract getArea(): number;
}




class Circle extends Geom {
    getArea() {
        return 123;
    }
}

class Square {
    getArea() {
        return 456;
    }
}
class Triangle {
    getArea() {
        return 789;
    }
}
