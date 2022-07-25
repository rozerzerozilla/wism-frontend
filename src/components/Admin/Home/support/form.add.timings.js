import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import style from "../../admin.module.css";
const format = "DD-MM-YYYY";

const FormAddTimings = ({
  userData,
  setuserData,
  holidays,
  setHolidays,
  allTime,
  setAllTime,
}) => {
  return (
    <div className="mb-3  mx-4">
      <div className="row mt-3">
        <div className="col-12">
          <div className="form-check">
            <input
              className="form-check-input"
              name="alltime"
              type="checkbox"
              onChange={(e) => {
                setAllTime(!allTime);
              }}
            />
            <label className="form-check-label">Opens 24 hours</label>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="row my-3">
          <div className="col-4">Day</div>
          <div className="col-4"> Working Hours(from- to) </div>
          <div className="col-4">Break Time(from- to)</div>
        </div>
      </div>

      <div className="row my-2">
        <div className="col-2">Monday</div>
        <div className="col-5">
          <div className="row">
            <div className="col-6">
              <input
                type="time"
                name="monday_work_from"
                className="form-control"
                disabled={allTime}
                value={
                  userData?.monday?.monday_work_from
                    ? userData?.monday?.monday_work_from
                    : ""
                }
                onChange={(e) =>
                  setuserData({
                    ...userData,
                    monday: {
                      ...userData.monday,
                      monday_work_from: e.target.value,
                    },
                    tuesday: {
                      ...userData.tuesday,
                      tuesday_work_from: e.target.value,
                    },
                    wednesday: {
                      ...userData.wednesday,
                      wednesday_work_from: e.target.value,
                    },
                    thursday: {
                      ...userData.thursday,
                      thursday_work_from: e.target.value,
                    },
                    friday: {
                      ...userData.friday,
                      friday_work_from: e.target.value,
                    },
                    saturday: {
                      ...userData.saturday,
                      saturday_work_from: e.target.value,
                    },
                    sunday: {
                      ...userData.sunday,
                      sunday_work_from: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="col-6">
              <input
                type="time"
                name="monday_work_to"
                className="form-control"
                disabled={allTime}
                value={
                  userData?.monday?.monday_work_to
                    ? userData?.monday?.monday_work_to
                    : ""
                }
                onChange={(e) =>
                  setuserData({
                    ...userData,
                    monday: {
                      ...userData.monday,
                      monday_work_to: e.target.value,
                    },
                    tuesday: {
                      ...userData.tuesday,
                      tuesday_work_to: e.target.value,
                    },
                    wednesday: {
                      ...userData.wednesday,
                      wednesday_work_to: e.target.value,
                    },
                    thursday: {
                      ...userData.thursday,
                      thursday_work_to: e.target.value,
                    },
                    friday: {
                      ...userData.friday,
                      friday_work_to: e.target.value,
                    },
                    saturday: {
                      ...userData.saturday,
                      saturday_work_to: e.target.value,
                    },
                    sunday: {
                      ...userData.sunday,
                      sunday_work_to: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="col-5">
          <div className="row">
            <div className="col-6">
              <input
                type="time"
                name="monday_break_from"
                className="form-control"
                disabled={allTime}
                value={
                  userData?.monday?.monday_break_from
                    ? userData?.monday?.monday_break_from
                    : ""
                }
                onChange={(e) =>
                  setuserData({
                    ...userData,
                    monday: {
                      ...userData.monday,
                      monday_break_from: e.target.value,
                    },
                    tuesday: {
                      ...userData.tuesday,
                      tuesday_break_from: e.target.value,
                    },
                    wednesday: {
                      ...userData.wednesday,
                      wednesday_break_from: e.target.value,
                    },
                    thursday: {
                      ...userData.thursday,
                      thursday_break_from: e.target.value,
                    },
                    friday: {
                      ...userData.friday,
                      friday_break_from: e.target.value,
                    },
                    saturday: {
                      ...userData.saturday,
                      saturday_break_from: e.target.value,
                    },
                    sunday: {
                      ...userData.sunday,
                      sunday_break_from: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="col-6">
              <input
                type="time"
                name="monday_break_to"
                className="form-control"
                disabled={allTime}
                value={
                  userData?.monday?.monday_break_to
                    ? userData?.monday?.monday_break_to
                    : ""
                }
                onChange={(e) =>
                  setuserData({
                    ...userData,
                    monday: {
                      ...userData.monday,
                      monday_break_to: e.target.value,
                    },
                    tuesday: {
                      ...userData.tuesday,
                      tuesday_break_to: e.target.value,
                    },
                    wednesday: {
                      ...userData.wednesday,
                      wednesday_break_to: e.target.value,
                    },
                    thursday: {
                      ...userData.thursday,
                      thursday_break_to: e.target.value,
                    },
                    friday: {
                      ...userData.friday,
                      friday_break_to: e.target.value,
                    },
                    saturday: {
                      ...userData.saturday,
                      saturday_break_to: e.target.value,
                    },
                    sunday: {
                      ...userData.sunday,
                      sunday_break_to: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row my-2">
        <div className="col-2">Tuesday</div>
        <div className="col-5">
          <div className="row">
            <div className="col-6">
              <input
                type="time"
                name="tuesday_work_from"
                className="form-control"
                disabled={allTime}
                value={
                  userData?.tuesday?.tuesday_work_from
                    ? userData?.tuesday?.tuesday_work_from
                    : ""
                }
                onChange={(e) =>
                  setuserData({
                    ...userData,
                    tuesday: {
                      ...userData.tuesday,
                      tuesday_work_from: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="col-6">
              <input
                type="time"
                name="tuesday_work_to"
                className="form-control"
                disabled={allTime}
                value={
                  userData?.tuesday?.tuesday_work_to
                    ? userData?.tuesday?.tuesday_work_to
                    : ""
                }
                onChange={(e) =>
                  setuserData({
                    ...userData,
                    tuesday: {
                      ...userData.tuesday,
                      tuesday_work_to: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="col-5">
          <div className="row">
            <div className="col-6">
              <input
                type="time"
                name="tuesday_break_from"
                className="form-control"
                disabled={allTime}
                value={
                  userData?.tuesday?.tuesday_break_from
                    ? userData?.tuesday?.tuesday_break_from
                    : ""
                }
                onChange={(e) =>
                  setuserData({
                    ...userData,
                    tuesday: {
                      ...userData.tuesday,
                      tuesday_break_from: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="col-6">
              <input
                type="time"
                name="tuesday_break_to"
                className="form-control"
                disabled={allTime}
                value={
                  userData?.tuesday?.tuesday_break_to
                    ? userData?.tuesday?.tuesday_break_to
                    : ""
                }
                onChange={(e) =>
                  setuserData({
                    ...userData,
                    tuesday: {
                      ...userData.tuesday,
                      tuesday_break_to: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row my-2">
        <div className="col-2">Wednesday</div>
        <div className="col-5">
          <div className="row">
            <div className="col-6">
              <input
                type="time"
                name="wednesday_work_from"
                className="form-control"
                disabled={allTime}
                value={
                  userData?.wednesday?.wednesday_work_from
                    ? userData?.wednesday?.wednesday_work_from
                    : ""
                }
                onChange={(e) =>
                  setuserData({
                    ...userData,
                    wednesday: {
                      ...userData.wednesday,
                      wednesday_work_from: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="col-6">
              <input
                type="time"
                name="wednesday_work_to"
                className="form-control"
                disabled={allTime}
                value={
                  userData?.wednesday?.wednesday_work_to
                    ? userData?.wednesday?.wednesday_work_to
                    : ""
                }
                onChange={(e) =>
                  setuserData({
                    ...userData,
                    wednesday: {
                      ...userData.wednesday,
                      wednesday_work_to: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="col-5">
          <div className="row">
            <div className="col-6">
              <input
                type="time"
                name="wednesday_break_from"
                className="form-control"
                disabled={allTime}
                value={
                  userData?.wednesday?.wednesday_break_from
                    ? userData?.wednesday?.wednesday_break_from
                    : ""
                }
                onChange={(e) =>
                  setuserData({
                    ...userData,
                    wednesday: {
                      ...userData.wednesday,
                      wednesday_break_from: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="col-6">
              <input
                type="time"
                name="wednesday_break_to"
                className="form-control"
                disabled={allTime}
                value={
                  userData?.wednesday?.wednesday_break_to
                    ? userData?.wednesday?.wednesday_break_to
                    : ""
                }
                onChange={(e) =>
                  setuserData({
                    ...userData,
                    wednesday: {
                      ...userData.wednesday,
                      wednesday_break_to: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row my-2">
        <div className="col-2">Thursday</div>
        <div className="col-5">
          <div className="row">
            <div className="col-6">
              <input
                type="time"
                name="thursday_work_from"
                className="form-control"
                disabled={allTime}
                value={
                  userData?.thursday?.thursday_work_from
                    ? userData?.thursday?.thursday_work_from
                    : ""
                }
                onChange={(e) =>
                  setuserData({
                    ...userData,
                    thursday: {
                      ...userData.thursday,
                      thursday_work_from: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="col-6">
              <input
                type="time"
                name="thursday_work_to"
                className="form-control"
                disabled={allTime}
                value={
                  userData?.thursday?.thursday_work_to
                    ? userData?.thursday?.thursday_work_to
                    : ""
                }
                onChange={(e) =>
                  setuserData({
                    ...userData,
                    thursday: {
                      ...userData.thursday,
                      thursday_work_to: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="col-5">
          <div className="row">
            <div className="col-6">
              <input
                type="time"
                name="thursday_break_from"
                className="form-control"
                disabled={allTime}
                value={
                  userData?.thursday?.thursday_break_from
                    ? userData?.thursday?.thursday_break_from
                    : ""
                }
                onChange={(e) =>
                  setuserData({
                    ...userData,
                    thursday: {
                      ...userData.thursday,
                      thursday_break_from: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="col-6">
              <input
                type="time"
                name="thursday_break_to"
                className="form-control"
                disabled={allTime}
                value={
                  userData?.thursday?.thursday_break_to
                    ? userData?.thursday?.thursday_break_to
                    : ""
                }
                onChange={(e) =>
                  setuserData({
                    ...userData,
                    thursday: {
                      ...userData.thursday,
                      thursday_break_to: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row my-2">
        <div className="col-2">Friday</div>
        <div className="col-5">
          <div className="row">
            <div className="col-6">
              <input
                type="time"
                name="friday_work_from"
                className="form-control"
                disabled={allTime}
                value={
                  userData?.friday?.friday_work_from
                    ? userData?.friday?.friday_work_from
                    : ""
                }
                onChange={(e) =>
                  setuserData({
                    ...userData,
                    friday: {
                      ...userData.friday,
                      friday_work_from: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="col-6">
              <input
                type="time"
                name="friday_work_to"
                className="form-control"
                disabled={allTime}
                value={
                  userData?.friday?.friday_work_to
                    ? userData?.friday?.friday_work_to
                    : ""
                }
                onChange={(e) =>
                  setuserData({
                    ...userData,
                    friday: {
                      ...userData.friday,
                      friday_work_to: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="col-5">
          <div className="row">
            <div className="col-6">
              <input
                type="time"
                name="friday_break_from"
                className="form-control"
                disabled={allTime}
                value={
                  userData?.friday?.friday_break_from
                    ? userData?.friday?.friday_break_from
                    : ""
                }
                onChange={(e) =>
                  setuserData({
                    ...userData,
                    friday: {
                      ...userData.friday,
                      friday_break_from: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="col-6">
              <input
                type="time"
                name="friday_break_to"
                className="form-control"
                disabled={allTime}
                value={
                  userData?.friday?.friday_break_to
                    ? userData?.friday?.friday_break_to
                    : ""
                }
                onChange={(e) =>
                  setuserData({
                    ...userData,
                    friday: {
                      ...userData.friday,
                      friday_break_to: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row my-2">
        <div className="col-2">Saturday</div>
        <div className="col-5">
          <div className="row">
            <div className="col-6">
              <input
                type="time"
                name="saturday_work_from"
                className="form-control"
                disabled={allTime}
                value={
                  userData?.saturday?.saturday_work_from
                    ? userData?.saturday?.saturday_work_from
                    : ""
                }
                onChange={(e) =>
                  setuserData({
                    ...userData,
                    saturday: {
                      ...userData.saturday,
                      saturday_work_from: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="col-6">
              <input
                type="time"
                name="saturday_work_to"
                className="form-control"
                disabled={allTime}
                value={
                  userData?.saturday?.saturday_work_to
                    ? userData?.saturday?.saturday_work_to
                    : ""
                }
                onChange={(e) =>
                  setuserData({
                    ...userData,
                    saturday: {
                      ...userData.saturday,
                      saturday_work_to: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="col-5">
          <div className="row">
            <div className="col-6">
              <input
                type="time"
                name="saturday_break_from"
                className="form-control"
                disabled={allTime}
                value={
                  userData?.saturday?.saturday_break_from
                    ? userData?.saturday?.saturday_break_from
                    : ""
                }
                onChange={(e) =>
                  setuserData({
                    ...userData,
                    saturday: {
                      ...userData.saturday,
                      saturday_break_from: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="col-6">
              <input
                type="time"
                name="saturday_break_to"
                className="form-control"
                disabled={allTime}
                value={
                  userData?.saturday?.saturday_break_to
                    ? userData?.saturday?.saturday_break_to
                    : ""
                }
                onChange={(e) =>
                  setuserData({
                    ...userData,
                    saturday: {
                      ...userData.saturday,
                      saturday_break_to: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row my-2">
        <div className="col-2">Sunday</div>
        <div className="col-5">
          <div className="row">
            <div className="col-6">
              <input
                type="time"
                name="sunday_work_from"
                className="form-control"
                disabled={allTime}
                value={
                  userData?.sunday?.sunday_work_from
                    ? userData?.sunday?.sunday_work_from
                    : ""
                }
                onChange={(e) =>
                  setuserData({
                    ...userData,
                    sunday: {
                      ...userData.sunday,
                      sunday_work_from: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="col-6">
              <input
                type="time"
                name="sunday_work_to"
                className="form-control"
                disabled={allTime}
                value={
                  userData?.sunday?.sunday_work_to
                    ? userData?.sunday?.sunday_work_to
                    : ""
                }
                onChange={(e) =>
                  setuserData({
                    ...userData,
                    sunday: {
                      ...userData.sunday,
                      sunday_work_to: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="col-5">
          <div className="row">
            <div className="col-6">
              <input
                type="time"
                name="sunday_break_from"
                className="form-control"
                disabled={allTime}
                value={
                  userData?.sunday?.sunday_break_from
                    ? userData?.sunday?.sunday_break_from
                    : ""
                }
                onChange={(e) =>
                  setuserData({
                    ...userData,
                    sunday: {
                      ...userData.sunday,
                      sunday_break_from: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="col-6">
              <input
                type="time"
                name="sunday_break_to"
                className="form-control"
                disabled={allTime}
                value={
                  userData?.sunday?.sunday_break_to
                    ? userData?.sunday?.sunday_break_to
                    : ""
                }
                onChange={(e) =>
                  setuserData({
                    ...userData,
                    sunday: {
                      ...userData.sunday,
                      sunday_break_to: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-12">
          <label className={style.label}>Stat Holidays</label>
          <DatePicker
            value={holidays}
            onChange={setHolidays}
            multiple
            sort
            format={format}
            calendarPosition="bottom-center"
            plugins={[<DatePanel />]}
            inputClass={style["custom-input"]}
            containerStyle={{
              width: "100%",
            }}
          />
        </div>
      </div>
      <div className="row my-2 mt-4">
        <div className="col-4">Weekend/Holiday Working Hours</div>
        <div className="col-8">
          <div className="row">
            <div className="col-6">
              <input
                type="time"
                name="holiday_work_from"
                className="form-control"
                onChange={(e) =>
                  setuserData({
                    ...userData,
                    holidays_working: {
                      ...userData.holidays_working,
                      holiday_work_from: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="col-6">
              <input
                type="time"
                name="holiday_work_to"
                className="form-control"
                onChange={(e) =>
                  setuserData({
                    ...userData,
                    holidays_working: {
                      ...userData.holidays_working,
                      holiday_work_to: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddTimings;
