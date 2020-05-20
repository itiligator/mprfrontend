/* eslint-disable */
// /* eslint-disable max-len */
// геттеры
export const VISIT_GET_PLANNED = 'VISIT_GET_PLANNED'; // геттер массива всех запланированных визитов
export const VISIT_GET_FINISHED = 'VISIT_GET_FINISHED'; // геттер массива всех заверешнных визитов
export const VISIT_GET_CURRENT = 'VISIT_GET_CURRENT'; // геттер текущего визита
export const VISIT_IS_CURRENT = 'VISIT_IS_CURRENT'; // состояние текущего визита
export const VISIT_GET_HISTORY = 'VISIT_GET_HISTORY'; // геттер объекта исторических визитов (ключи - UUID)


// действия
export const VISIT_DOWNLOAD_ALL_FROM_SERVER = 'VISIT_DOWNLOAD_ALL_FROM_SERVER'; // перезаписывает
// массивы завершенных и запланированных визитов путем вызова VISIT_DOWNLOAD_PLANNED_FROM_SERVER
// и VISIT_DOWNLOAD_FINISHED_FROM_SERVER

export const VISIT_DOWNLOAD_PLANNED_FROM_SERVER = 'VISIT_DOWNLOAD_PLANNED_FROM_SERVER'; // получает
// и перезаписывает в хранилище данные запланированных визитов

export const VISIT_DOWNLOAD_FINISHED_FROM_SERVER = 'VISIT_DOWNLOAD_FINISHED_FROM_SERVER';
// получает и перезаписывает в хранилище данные завершенных визитов

export const VISIT_DOWNLOAD_HISTORY_BY_INN_FROM_SERVER = 'VISIT_DOWNLOAD_HISTORY_BY_INN_FROM_SERVER';
// получает и перезаписывает в хранилище данные исторических визитов по ИНН клиента

export const VISIT_UPLOAD_CURRENT_TO_SERVER = 'VISIT_UPLOAD_CURRENT_TO_SERVER';// отправляет данные
// текущего визита на сервер и обновляет завершенные визиты данными текущего визита

export const VISIT_SAVE_CURRENT_TO_VUEX = 'VISIT_SAVE_CURRENT_TO_VUEX'; // сохранение данных текущего
// визита в хранилище

export const VISIT_CLOSE_CURRENT = 'VISIT_CLOSE_CURRENT'; // завершает текущий визит,
// отправляет данные на сервер, переносит данные в завершенные визиты и обнуляет текущий визит


// мутации
export const VISIT_ERROR = 'VISIT_ERROR'; // пишет ошибку в state.visitStatus

export const VISIT_WRITE_CURRENT_TO_VUEX = 'VISIT_WRITE_CURRENT_TO_VUEX'; // сохранение данных текущего
// визита в хранилище

export const VISIT_WRITE_PLANNED_TO_VUEX = 'VISIT_WRITE_PLANNED_TO_VUEX'; // перезаписывает массив
// запланированных визитов в хранилище переданными данными

export const VISIT_WRITE_FINISHED_TO_VUEX = 'VISIT_WRITE_FINISHED_TO_VUEX'; // перезаписывает массив
// завершенных визитов в хранилище переданными данными

export const VISIT_CLOSE_AND_REPLACE_CURRENT = 'VISIT_CLOSE_AND_REPLACE_CURRENT'; // переносит
// данные текущего визита в завершенные и обнуляет данные текущего визита

export const VISIT_WRITE_HISTORY_TO_VUEX_BY_INN = 'VISIT_WRITE_HISTORY_TO_VUEX_BY_INN';
// добавляет по ключу-ИНН в объект исторических массивов переданный массив

export const VISIT_FLASH_ALL = 'VISIT_FLASH_ALL'; // обнуляет все данные всех визитов


// // геттеры
// export const VISIT_GET_ALL = 'VISIT_GET_ALL'; // геттер всех имеющихся в хранилище визитов
// export const VISIT_GET_CURRENT = 'VISIT_GET_CURRENT'; // геттер текущего визита
// export const VISIT_GET_BY_UUID = 'VISIT_GET_BY_UUID'; // геттер визита по UUID
// export const VISIT_IS_CURRENT = 'VISIT_IS_CURRENT'; // геттер наличия текущего визита
//
// // действия
// // загрузки с сервера
// export const VISIT_DOWNLOAD_ALL_FROM_SERVER = 'VISIT_DOWNLOAD_ALL_FROM_SERVER'; // получение всех запланированных и оконченных сегодня визитов с сервера
// export const VISIT_DOWNLOAD_PLANNED_FROM_SERVER = 'VISIT_DOWNLOAD_PLANNED_FROM_SERVER'; // получение всех запланированных визитов с сервера
// export const VISIT_DOWNLOAD_FINISHED_TODAY_FROM_SERVER = 'VISIT_DOWNLOAD_FINISHED_TODAY_FROM_SERVER'; // получение всех оконченных сегодня визитов с сервера
// export const VISIT_DOWNLOAD_CLIENT_HISTORY_FROM_SERVER = 'VISIT_DOWNLOAD_CLIENT_HISTORY_FROM_SERVER'; // получениепо ИНН клиента последних трех завершенных и обработанных 1С визитов
// // отправки на сервер
// export const VISIT_UPLOAD_CURRENT_TO_SERVER = 'VISIT_UPLOAD_CURRENT_TO_SERVER'; // отправка данных текущего визита на сервер
// // запись в хранилище
// export const VISIT_SAVE_CURRENT_TOVUEX = 'VISIT_SAVE_CURRENT_TOVUEX'; // сохранение данных текущего визита в хранилище
//
//
// // мутации
// export const VISIT_ERROR = 'VISIT_ERROR'; // пишет 'error' в  state.status
// export const VISIT_WRITE_DATA_TO_STORE = 'VISIT_WRITE_DATA_TO_STORE'; // обновляет хранящиеся визиты переданными данными
// export const VISIT_UPDATE_CURRENT_IN_VUEX = 'VISIT_UPDATE_CURRENT_IN_VUEX'; // перезаписывает текущий визит переданными данными
// export const VISIT_PUSH_CURRENT_TO_ALL = 'VISIT_PUSH_CURRENT_TO_ALL'; // записывает данные текущего визита в хранилище всех визитов
// export const VISIT_UPDATE_BY_INDEX = 'VISIT_UPDATE_BY_INDEX'; // перезаписывает переданные данные визита по индексу в хранилище всех массивов
