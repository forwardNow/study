/*
 * 抽象类
 *
 *    抽象类做为其它派生类的基类使用。
 *    它们一般不会直接被实例化。
 *    不同于接口，抽象类可以包含成员的实现细节。
 */
abstract class Car {
  // 在派生类中实现
  public abstract run(): void;
  public move(): void {
    console.log("moving...");
  }
}

class RedCar extends Car {
  public run(): void {
    console.log("running...");
  }
}
