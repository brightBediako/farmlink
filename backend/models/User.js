import mongoose from "mongoose";
const Schema = mongoose.Schema;
import crypto from "crypto";

const UserSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      match:
        /^\+(20|212|213|216|218|220|221|222|223|224|225|226|227|228|229|230|231|232|233|234|235|236|237|238|239|240|241|242|243|244|245|246|247|248|249|250|251|252|253|254|255|256|257|258|260|261|262|263|264|265|266|267|268|269|27|290|291|292|293|294|295|296|297|298|299|30|31|32|33|34|35|36|37|38|39|40|41|42|43|44|45|46|47|48|49|500|501|502|503|504|505|506|507|508|509|51|52|53|54|55|56|57|58|590|591|592|593|594|595|596|597|598|599|60|61|62|63|64|65|66|67|68|690|691|692|693|694|695|696|697|698|699|70|71|72|73|74|75|76|77|78|79|800|801|802|803|804|805|806|807|808|809|81|82|83|84|85|86|87|88|89|90|91|92|93|94|95|96|97|98|991|992|993|994|995|996|997|998|999)\s?\d{3,15}(\s?\d{3}){2,3}$/,
    },
    password: {
      type: String,
      required: true,
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    wishLists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WishList",
      },
    ],
    role: {
      type: String,
      enum: ["buyer", "farmer", "admin"],
      default: "buyer",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    vendorProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    accountVerificationToken: {
      type: String,
      default: null,
    },
    accountVerificationExpires: {
      type: Date,
      default: null,
    },
    passwordResetToken: {
      type: String,
      default: null,
    },
    passwordResetExpires: {
      type: Date,
      default: null,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    hasShippingAddress: {
      type: Boolean,
      default: false,
    },
    shippingAddress: {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      address: {
        type: String,
      },
      city: {
        type: String,
      },
      postalCode: {
        type: String,
      },
      province: {
        type: String,
      },
      country: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

// generate token for account verification
UserSchema.methods.generateAccountVerificationToken = function () {
  const emailToken = crypto.randomBytes(20).toString("hex");

  this.accountVerificationToken = crypto
    .createHash("sha256")
    .update(emailToken)
    .digest("hex");

  this.accountVerificationExpires = Date.now() + 1 * 60 * 60 * 1000;
  return emailToken;
};

// generate token for password reset
UserSchema.methods.generatePasswordResetToken = function () {
  const emailToken = crypto.randomBytes(20).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(emailToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return emailToken;
};

// schema to model
const User = mongoose.model("User", UserSchema);

export default User;
