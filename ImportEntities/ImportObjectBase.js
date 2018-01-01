/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IbsysPlanspielApp.ImportEntities {
    public class ImportObjectBase {
	  public enum AvailableEnum { OnArrival, NextPeriod, Undefined };
	  public enum SupplierEnum { Fast, Normal, Undefined };

	  protected double ToDouble (string value) {
		return Convert.ToDouble(value);
	  }

	  protected int ToInt (string value) {
		double res;
		if (double.TryParse(value, out res))
		    return Convert.ToInt32(res);
		return Convert.ToInt32(value.Trim());
	  }

	  protected long IdFromItem (string item) {
		var splitted = item.Split('-');
		return Convert.ToInt32(splitted[splitted.Length - 1].Trim());
	  }

	  protected string NameFromItem (string item) {
		var splitted = item.Split('-');
		return splitted[0].Trim();
	  }

    }
}
