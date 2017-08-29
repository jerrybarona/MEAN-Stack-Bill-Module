import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private _elRef: ElementRef) {}
  showAlert() {
    alert("it just got clicked");
  }

  ngOnInit(): any {
    var	menuRight = jQuery(this._elRef.nativeElement).find( 'nav#cbp-spmenu-s2' ),
      showRightPush = jQuery(this._elRef.nativeElement).find( 'button#showRightPush' ),
      body = jQuery(this._elRef.nativeElement).find( 'div#bodydiv' );
      var menuClass = 0;

    showRightPush.on('click',  function() {
      // alert("menu clicked initial: " + showRightPush.attr('class'));

      if (menuClass == 0) {
        menuClass = 1;
        showRightPush.removeClass();
        showRightPush.addClass('active');
        body.removeClass();
        body.addClass('cbp-spmenu-push-toleft');
        menuRight.addClass('cbp-spmenu-open');
      }
      else if (menuClass == 1) {
        menuClass = 0;
        showRightPush.removeClass();
        body.removeClass();
        menuRight.removeClass('cbp-spmenu-open');
      }
  });
}

  title = 'Welcome to Verizon!!';
}
