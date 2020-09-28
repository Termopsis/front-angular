export class DialogResult {
  action: DialogAction;
  obj: any;

  constructor(action: DialogAction, obj?: any){
    this.action = action;
    this.obj = obj;
  }
}

export enum DialogAction{
  SETTINGS_CHANGE, //Настройки были изменены
  SAVE, // сохранение изменений
  OK, // подтверждение/сохранение
  CANCEL, // отмена всех действий
  DELETE, // удаление
  COMPLETE, // завершение задачи
  ACTIVATE //активация задачи (незавершенная)
}
