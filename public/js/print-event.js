
var available_printers = null;
var selected_category = null;
var default_printer = null;
var selected_printer = null;
var default_mode = true;

setup_web_print();

function setup_web_print() {
  default_mode = true;
  selected_printer = null;
  available_printers = null;
  selected_category = null;
  default_printer = null;

  BrowserPrint.getDefaultDevice(
    "printer",
    function (printer) {
      default_printer = printer;
      if (printer != null && printer.connection != undefined) {
        selected_printer = printer;
      }
      BrowserPrint.getLocalDevices(
        function (printers) {
          available_printers = printers;
          var printers_available = false;
          if (printers != undefined) {
            for (var i = 0; i < printers.length; i++) {
              if (printers[i].connection == "usb") {
                var opt = document.createElement("option");
                opt.innerHTML = printers[i].connection + ": " + printers[i].uid;
                opt.value = printers[i].uid;
                printers_available = true;
              }
            }
          }

          if (!printers_available) {
            showErrorMessage("No Zebra Printers could be found!");
            return;
          } else if (selected_printer == null) {
            default_mode = false;
            changePrinter();
          }
        },
        undefined,
        "printer"
      );
    },
    function (error_response) {
      showBrowserPrintNotFound();
    }
  );
}

function showBrowserPrintNotFound() {
  showErrorMessage(
    "An error occured while attempting to connect to your Zebra Printer. You may not have Zebra Browser Print installed, or it may not be running. Install Zebra Browser Print, or start the Zebra Browser Print Service, and try again."
  );
}

function sendData(data) {
  checkPrinterStatus(function (text) {
    if (text == "Ready to Print") {
      selected_printer.send(data, printComplete, printerError);
    } else {
      printerError(text);
    }
  });
}

function checkPrinterStatus(finishedFunction) {
  selected_printer.sendThenRead(
    "~HQES",
    function (text) {
      var that = this;
      var statuses = new Array();
      var ok = false;
      var is_error = text.charAt(70);
      var media = text.charAt(88);
      var head = text.charAt(87);
      var pause = text.charAt(84);
      // check each flag that prevents printing
      if (is_error == "0") {
        ok = true;
        statuses.push("Ready to Print");
      }
      if (media == "1") statuses.push("Paper out");
      if (media == "2") statuses.push("Ribbon Out");
      if (media == "4") statuses.push("Media Door Open");
      if (media == "8") statuses.push("Cutter Fault");
      if (head == "1") statuses.push("Printhead Overheating");
      if (head == "2") statuses.push("Motor Overheating");
      if (head == "4") statuses.push("Printhead Fault");
      if (head == "8") statuses.push("Incorrect Printhead");
      if (pause == "1") statuses.push("Printer Paused");
      if (!ok && statuses.Count == 0) statuses.push("Error: Unknown Error");
      finishedFunction(statuses.join());
    },
    printerError
  );
}

function printComplete() {}

function changePrinter() {
  default_mode = false;
  selected_printer = null;
  if (available_printers == null) {
    setTimeout(changePrinter, 200);
    return;
  }
  onPrinterSelected();
}

function onPrinterSelected() {
  selected_printer = available_printers[0];
}

function showErrorMessage(text) {
  console.error(text);
}

function printerError(text) {
  showErrorMessage(
    "An error occurred while printing. Please try again." + text
  );
}