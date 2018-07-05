Search = React.createClass({
  getInitialState() {
    // funkcja inicjująca stan zwraca klucz serchingText, na początku oczywiście nic nie ma w nim bo jeszcze nic nie wpisaliśmy więc pusty string
    return {
      searchingText: ''
    };
  },

  handleChange: function (event) {
    // do zmiennej searching text przypisz value inputa
    var searchingText = event.target.value;
    // by wymuśić przerenderowanie elementu trzeba zmienić mu stan więc przypisujemy to co pobraliśmy do searchingText w stanie komponentu
    this.setState({
      searchingText: searchingText
    });
    // jeśli wpisywany text jest dłuższy niż dwa znaki to uruchom funkcję onSearch (listener) przekazaną jako props od rodzica i jako parametr podaj jej searchingText, można wpisać zwyczajnie bo jest to zmienna w tej samej funkcji patrz wyżej
    if (searchingText.length > 2) {
      this.props.onSearch(searchingText);
    }
  },

  handleKeyUp: function (event) {
    // po zwolnieniu klawisza sprawdza czy to enter jeśli tak to odpala funkcje onSearch podaną w propsach jest to funkcja handleSearch w komponencie app, która uruchamia metodę do pobierania gifów
    if (event.keyCode === 13) {
      // tutaj jako parametr już trzeba podać searchingText z this.state, bo odwołuję się do stanu, którego w tej funkcji nie ustawiam
      // Pytanko: Czemu tutaj nie chcemy aktualizować stanu jak wyżej?
      this.props.onSearch(this.state.searchingText);
    }
  },

  render: function () {
    var styles = {
      fontSize: '1.5em',
      width: '90%',
      maxWidth: '350px'
    };

    return <input type = "text" onChange = {this.handleChange} onKeyUp = {this.handleKeyUp} style = {styles} value = {this.state.searchingText} />
  }
});